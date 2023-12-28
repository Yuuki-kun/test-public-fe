import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getUserRole, onLogout } from "../../axios_helper/axios_helper";
import Login from "../login/Login";
import { ShopContext } from "../../context/BookContext";

const AdminLayout = ({ loggedIn }) => {
  const [role, setRole] = useState("ADMIN");
  const { admin_login_info } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const userEmail = admin_login_info?.user_info
    ? JSON.parse(admin_login_info.user_info).email
    : "";

  // if (admin_login_info !== null) {
  //   if (admin_login_info.logged_in) {
  //     getUserRole(userEmail)
  //       .then((userRole) => {
  //         if (role !== "ADMIN") {
  //           // window.location.href = "/unauthorize";
  //         }
  //         setRole(userRole);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }
  // if (role !== null) {
  //   console.log("role=" + role);
  // }

  const checkUserRole = async () => {
    if (admin_login_info !== null && admin_login_info.logged_in) {
      try {
        const userRole = await getUserRole(userEmail);
        if (userRole !== "ADMIN") {
          return <Login role={"ADMIN"} />;
        }
        setRole(userRole);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    // checkUserRole();
    setLoading(false);
  }, [admin_login_info, userEmail]);

  // if (role !== "ADMIN" && role === "") {
  //   return <Login role={"ADMIN"} />;
  // }

  // if (admin_login_info === null) {
  //   return <Login role={"ADMIN"} />;
  // }

  console.log("role=" + role);
  const logout = () => {
    onLogout();
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : role === "ADMIN" ? (
        <div class="container-body ontainer-fluid row p-0 h-100 m-0">
          <div class="container-nav col-1 p-0">
            <nav>
              <div class="admin-sidebar h-100" id="sidebar">
                <div class="admin-logo">
                  <img src="/images/logo.png" alt="" />
                </div>
                <ul class="menu">
                  <li class="active">
                    <Link to={"admin-dashboard"}>
                      <i class="fas fa-tachometer-alt"></i>
                      <span class="align-self-center">Tổng Quan</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"product-management"}>
                      <i class="fa-solid fa-book"></i>
                      <span>Sản Phẩm</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"category-management"}>
                      <i class="fa-solid fa-list"></i>
                      <span>Danh Mục</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"order-management"}>
                      <i class="fa-solid fa-file-invoice"></i>
                      <span>Đơn Hàng</span>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={logout}>
                      <i class="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <Outlet />
        </div>
      ) : (
        <>{/* <Login role={"ADMIN"} /> */}</>
      )}
    </>
  );
};

export default AdminLayout;
