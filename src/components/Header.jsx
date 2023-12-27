import React from "react";
import Navbar from "./Navbar/Navbar";
const Header = ({ loggedIn }) => {
  return (
    <>
      <div className="navigation-bar">
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className="header-top-text col-6 text-start">
                @tongcongminh & @tranmanhhuynh
              </div>
              <div className="header-top-text col-6 text-end">
                FREESHIP cho Đơn Hàng Trên 499.000₫
              </div>
            </div>
          </div>
        </div>
        <Navbar loggedIn={loggedIn} />
      </div>
    </>
  );
};

export default Header;
