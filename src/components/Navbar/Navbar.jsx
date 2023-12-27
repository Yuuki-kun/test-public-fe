import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import CheckNavigate from "../../services/Utils";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/BookContext";
import LoginOption from "../login/LoginOption";
import axios from "axios";
import { headers } from "../../axios_helper/axios_helper";
const Navbar = ({ loggedIn }) => {
  const { user_login_info } = useContext(ShopContext);
  const [customerInfo, setCustomerInfo] = useState({});
  const { cartItems } = useContext(ShopContext);
  const [searchData, setSearchData] = useState("");
  const [approximateData, setApproximateData] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search?searchTerm=${searchData}`;
  };
  console.log(approximateData);
  const handleInputChange = (e) => {
    setSearchData(e.target.value);
  };

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

  console.log(customerInfo);
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <div className="logo">
              <img
                src="./images/logo.png"
                alt="logo"
                width="70px"
                height="50px"
              />
            </div>
          </a>
          <button
            className="navbar-toggler border border-red border-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars text-white" aria-hidden="true"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-22 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Trang Chủ
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sách Mới
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/about"} className="nav-link" href="#">
                  Giới Thiệu
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contact"} className="nav-link" href="#">
                  Liên Hệ
                </Link>
              </li>

              <li className="search-form ">
                <form className="d-flex ma" role="search">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Tìm kiếm..."
                      aria-label="Search"
                      value={searchData}
                      onChange={handleInputChange}
                    />
                    <button
                      onClick={handleSearch}
                      className="btn btn-search btn-outline-success"
                      type="submit"
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </form>
              </li>
            </ul>
            <div className="infor">
              <div className="account">
                <Link className="btn button-account" to={"/customer"}>
                  <i className="fa fa-user fa-2x me-2" aria-hidden="true"></i>
                  {customerInfo !== null && loggedIn ? (
                    <span>{customerInfo.name}</span>
                  ) : (
                    <div>
                      <span>Tài Khoản</span>
                    </div>
                  )}
                </Link>
                <LoginOption loggedIn={loggedIn} customerInfo={customerInfo} />
              </div>
              <div className="shopping-cart">
                <Link className="btn button-card" to="/cart">
                  <i
                    className="fa fa-shopping-cart fa-2x me-2"
                    aria-hidden="true"
                  ></i>
                  <span>Giỏ Hàng</span>
                </Link>
                <div className="badge">
                  <div className="cart-count">
                    {Object.keys(cartItems).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
