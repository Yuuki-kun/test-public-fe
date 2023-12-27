import React from "react";
import { Link } from "react-router-dom";

const NoneLoggedIn = () => {
  return (
    <div className="login-option">
      <ul className="login-option-element">
        <li>
          <Link to={"/login"}>Đăng nhập</Link>
        </li>
        <li>
          <Link to={"/register"}>Đăng ký</Link>
        </li>
      </ul>
    </div>
  );
};

export default NoneLoggedIn;
