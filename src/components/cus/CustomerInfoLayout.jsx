import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/BookContext";
import axios from "axios";
import { headers } from "../../axios_helper/axios_helper";
import Login from "../login/Login";

const CustomerInfoLayout = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_login_info]);
  return (
    <>
      {user_login_info !== null ? (
        <div className="container customer-container">
          <div className="row">
            <div className="col-3">
              <div className="cus-navigation">
                <div className="top-content">
                  <div>
                    <img src="./images/logo.png" alt="avatar" />
                  </div>
                  <div className="cus-info">
                    <p>Xin chào</p>
                    <p>{customerInfo && customerInfo.name}</p>
                  </div>
                </div>
                <div className="menu-bar">
                  <Link
                    // onClick={() => {
                    //   window.location.href = `/customer/profile/${1}`;
                    // }}
                    to={`profile/${customerInfo && customerInfo.id}`}
                  >
                    Thông tin tài khoản
                  </Link>
                  <Link to={`orders`}> Quản lý đơn hàng</Link>
                  <Link>Đánh giá sản phẩm</Link>
                  <Link>Chăm sóc khách hàng</Link>
                </div>
              </div>
            </div>
            <div className="col-9">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default CustomerInfoLayout;
