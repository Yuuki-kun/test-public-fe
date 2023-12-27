import React from "react";
import { Link } from "react-router-dom";
import { onLogout } from "../../axios_helper/axios_helper";

const LoggedIn = ({ customerInfo }) => {
  return (
    <>
      <div className="login-option">
        <ul className="login-option-element">
          <li>
            <Link to={`/customer/profile/${customerInfo && customerInfo.id}`}>
              Hồ sơ
            </Link>
          </li>
          <li>
            <Link to={`/customer/orders`}>Đơn hàng của tôi</Link>
          </li>
          <li>
            <Link onClick={onLogout}>Đăng xuất</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LoggedIn;
