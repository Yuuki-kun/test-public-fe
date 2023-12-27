import React, { useContext, useState } from "react";
import "./login.css";
import { onLogin } from "../../axios_helper/axios_helper";
import { ShopContext } from "../../context/BookContext";
const Login = ({ role }) => {
  const { isLogin, setLogin } = useContext(ShopContext);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const login = (e, email, password) => {
    console.log(isLogin);
    onLogin(e, email, password, setLogin, role);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };
  return (
    <>
      <div className="login-form d-flex justify-content-center align-items-center">
        <div className="container row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 ">
            <div className="card bg-white">
              <div className="card-body p-5">
                <form
                  className="mb-3 mt-md-4"
                  onSubmit={(e) =>
                    login(e, loginForm.email, loginForm.password)
                  }
                >
                  <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center">
                    <img src="./images/logo.png" alt="logo" className="logo" />
                  </h2>
                  <h3 className="mb-5 d-flex justify-content-center">
                    Welcome To Bookstore
                  </h3>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Vui lòng nhập email..."
                      value={loginForm.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Mật Khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Vui lòng nhập mật khẩu..."
                      value={loginForm.password}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="small mb-5">
                    <a
                      className="text-primary text-decoration-none"
                      href="forget-password.html"
                    >
                      Quên mật khẩu?
                    </a>
                  </p>
                  <div className="d-grid">
                    <button className="btn btn-outline-dark" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div>
                  <p className="mb-0 text-center">
                    Chưa có tài khoản? hãy nhấp vào
                    <a
                      href="signup.html"
                      className="signup text-primary fw-bold text-decoration-none"
                    >
                      đăng ký!
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
