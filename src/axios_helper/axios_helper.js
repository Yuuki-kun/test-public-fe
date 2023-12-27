import axios from "axios";

axios.defaults.baseURL = "https://short-sort-production.up.railway.app";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAllBooks = async () => {
  try {
    const response = await request("GET", "/api/v1/home", {});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const getAllPriceId = async (listOfProductId) => {
//   try {
//     const response = await request(
//       "POST",
//       "/api/v1/home/get-pricesId",
//       listOfProductId
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const getOrderInfo = async (orderId) => {
  try {
    const response = await request(
      "GET",
      `/order/tracking?orderid=${orderId}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserRole = async (userEmail) => {
  try {
    const response = await request(
      "GET",
      `/account/get-role?email=${userEmail}`,
      {}
    );
    if (response.status === 401) {
      console.log(401);
    }
    return response.data;
  } catch (error) {
    return null;
  }
};

export const postProd = async (listOfProductPurchase) => {
  const userData = getUserData();
  console.log(listOfProductPurchase);
  try {
    const response = await axios.post("/stripe/api/checkout-card", {
      productPurchases: listOfProductPurchase,
      customerEmail: JSON.parse(userData.user_info).email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductDetails = async (bookId) => {
  try {
    const response = await axios.get(
      `/api/v1/home/product-details?id=${bookId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const request = (method, url, data) => {
  let headers = {};
  if (getAccessToken() !== null && getAccessToken() !== "null") {
    headers = { Authorization: `Bearer ${getAccessToken()}` };
  }
  console.log(headers);
  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
  });
};

export const onRegister = (e, fullName, email, password, phoneNumber) => {
  e.preventDefault();
  axios
    .post("/api/v1/auth/register", {
      //data
      fullName: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      role: "USER",
    })
    .then((response) => {
      if (response.status == 200) {
        //đăng ký thành công, lưu token vào localstorage
        if (response.data.is_success === 1) {
          setAccessToken(
            response.data.access_token,
            response.data.refresh_token
          );
          window.location.href = "/login";
        } else {
          alert(response.data.failed_type);
        }

        console.log(response.data);
      } else if (response.status > 300) {
        //Đăng ký thất bại
      }
    })
    .catch((err) => console.log(err));
};

export const onLogin = (e, email, password, setLogin, role) => {
  console.log(lastSegmentPath());

  // if (lastSegmentPath() !== "login") {
  // } else {
  //   // window.location.href = "/";
  // }
  e.preventDefault();
  axios
    .post("/api/v1/auth/authenticate", {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      const currentPath = window.location.pathname;

      if (response.status == 200) {
        console.log(response.config.data);
        //đăng nhập thành công, lưu token vào localStorage

        if (response.data.is_success === 0) {
          alert(response.data.failed_type);
        } else {
          if (currentPath.includes("admin")) {
            localStorage.setItem("admin_token", response.data.access_token);
            saveUserData("admin_data", response.config.data);
            setLogin(true);
          } else {
            setAccessToken(
              response.data.access_token,
              response.data.refresh_token
            );
            saveUserData("user_data", response.config.data);
            setLogin(true);
            console.log(lastSegmentPath);
          }

          if (lastSegmentPath() === "login") {
            window.location.href = "/";
          } else window.location.href = "/" + lastSegmentPath();
        }
      } else if (response.status === 401) {
        console.log("Phiên đăng nhập đã hết hạn");
      }
    });
};

export const onLogout = () => {
  request("get", "/api/v1/auth/logout", {})
    .then((res) => {
      console.log(res);
      const currentPath = window.location.pathname;
      if (currentPath.includes("admin")) {
        localStorage.removeItem("admin_data");
        localStorage.removeItem("admin_token");
      } else {
        localStorage.removeItem("user_data");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
      if (currentPath.includes("/")) {
        const pathParts = currentPath.split("/");
        const desiredPart = pathParts[1];
        window.location.href = `/${desiredPart}`;
      } else {
        window.location.href = "/";
      }
    })
    .catch((err) => console.log(err));
};

const setAccessToken = (accessToken, refreshToken) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const saveUserData = (who, userData) => {
  const user_data = {
    logged_in: "true",
    user_info: userData,
  };
  localStorage.setItem(who, JSON.stringify(user_data));
  // const object = JSON.parse(localStorage.getItem("user_data"));
  // const user_i = JSON.parse(object.user_info);
  // console.log(object);
  // console.log(user_i.email);
};

export const getUserData = () => {
  return JSON.parse(localStorage.getItem("user_data"));
};

export const lastSegmentPath = () => {
  const currentPath = window.location.pathname;
  const segments = currentPath.split("/");
  const lastSegment = segments[segments.length - 1];
  return lastSegment;
};

export const headers_multipart = {
  "Content-Type": "multipart/form-data",
};

export const headers = {
  "Content-Type": "application/json",
};

export const admin_headers_multipart = {
  "Content-Type": "multipart/form-data",
};

export const admin_headers = {
  "Content-Type": "application/json",
};

const accessToken = getAccessToken();

if (accessToken !== null && accessToken !== "null") {
  headers["Authorization"] = `Bearer ${accessToken}`;
  headers_multipart["Authorization"] = `Bearer ${accessToken}`;
}

const admin_access_token = localStorage.getItem("admin_token");
if (admin_access_token !== null && admin_access_token !== "null") {
  admin_headers["Authorization"] = `Bearer ${admin_access_token}`;
  admin_headers_multipart["Authorization"] = `Bearer ${admin_access_token}`;
}

//admin
export const getReviewOrders = async () => {
  try {
    console.log(admin_headers);
    const res = await axios.get("/admin-service", {
      headers: admin_headers,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return "unauthorize";
  }
};
