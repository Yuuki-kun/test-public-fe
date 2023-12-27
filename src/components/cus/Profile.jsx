import React, { useContext, useEffect, useState } from "react";
import "./customer.css";
import Login from "../login/Login";
import { ShopContext } from "../../context/BookContext";
import axios from "axios";
import { headers } from "../../axios_helper/axios_helper";

const Profile = ({ loggedIn }) => {
  const { user_login_info } = useContext(ShopContext);
  const [customerInfo, setCustomerInfo] = useState({});
  useEffect(() => {
    const userEmail = user_login_info?.user_info
      ? JSON.parse(user_login_info.user_info).email
      : "";

    axios
      .get(`/account/get-info?email=${userEmail}`, {
        headers: headers,
      })
      .then((res) => {
        setCustomerInfo(res.data);
        setUsers({
          name: customerInfo.name,
          phone: customerInfo.phoneNumber,
          address:
            customerInfo.address == null ? "chưa có" : customerInfo.address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_login_info]);
  console.log(customerInfo);
  const [users, setUsers] = useState(
    customerInfo && {
      name: customerInfo.name,
      phone: customerInfo.phoneNumber,
      address: customerInfo.address == null ? "chưa có" : customerInfo.address,
    }
  );

  const handleInputChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const userEmail = user_login_info?.user_info
    ? JSON.parse(user_login_info.user_info).email
    : "";

  const handleUpdate = () => {
    axios
      .put(`/account/edit?email=${userEmail}`, {
        name: users.name,
        phone: users.phone,
        address: users.address,
      })
      .then((res) => {
        if (res.data) {
          alert("Thay đổi thông tin thành công");
        } else {
          alert("Thay đổi thông tin thất bại");
        }
        // window.location
      })
      .catch((er) => {
        console.log(er);
        alert("Thay đổi thông tin thất bại");
      });
  };

  return (
    <>
      {!loggedIn ? (
        <Login />
      ) : (
        customerInfo && (
          <div className="container profile-container">
            <div className="row">
              <div className="col-12 header-content">Thông tin tài khoản</div>
              <div className="col-12 profile">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-start">
                      <p>Thông tin cá nhân</p>
                      <p className="user-contact-header">Thông tin liên hệ</p>
                    </div>
                  </div>
                  <div className="col-7 profile-info">
                    <div className="user-info">
                      <img src="./images/logo.png" alt="avatar" />
                      <div>
                        <p>Họ tên</p>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={users.name}
                          onChange={handleInputChange}
                        />
                        <button onClick={handleUpdate}>Đổi</button>
                      </div>
                    </div>

                    <div className="country">
                      <p>Quốc gia</p>
                      <select name="" id="">
                        <option value="">Việt Nam</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-5 contact-info">
                    <div className="contact-infor-element">
                      <p>Email: </p>
                      <p>{userEmail}</p>
                    </div>
                    <div className="contact-infor-element">
                      <p>Phone: </p>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={users.phone}
                        onChange={handleInputChange}
                      />
                      <button onClick={handleUpdate}>Update</button>
                    </div>
                    <div className="contact-infor-element">
                      <p>Address: </p>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={users.address}
                        onChange={handleInputChange}
                      />
                      <button onClick={handleUpdate}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
