import React, { useState } from "react";
import "./register.css";
import { onRegister } from "../../axios_helper/axios_helper";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    retypePassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  console.log(registerForm);
  return (
    <>
      <div className="register container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="card card-registration w-75">
            <div className="card-body p-md-5 text-black">
              <form
                onSubmit={(e) =>
                  onRegister(
                    e,
                    registerForm.fullName,
                    registerForm.email,
                    registerForm.password,
                    registerForm.phoneNumber
                  )
                }
              >
                <img src="./images/logo.png" alt="logo" className="mb-3 logo" />
                <h3 className="mb-5 text-uppercase">Đăng Ký Thành Viên</h3>
                <div className="col-md-12 mb-4">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="fullName">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={registerForm.fullName}
                      className="form-control form-control-lg"
                      placeholder="Vui lòng nhập họ tên ..."
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={registerForm.email}
                      className="form-control form-control-lg"
                      placeholder="Vui lòng nhập mail..."
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="phoneNumber">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control form-control-lg"
                    placeholder="Vui lòng nhập số điện thoại..."
                    value={registerForm.phoneNumber}
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Nhập mật khẩu..."
                    value={registerForm.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="retypePassword">
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type="password"
                    id="retypePassword"
                    name="retypePassword"
                    className="form-control form-control-lg"
                    placeholder="Nhập lại mật khẩu..."
                    value={registerForm.retypePassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="foot d-flex justify-content-between align-items-center">
                  <div>
                    Đã có tài khoản? <br /> Quay lại{" "}
                    <a href="#" className="text-decoration-none">
                      <strong>đăng nhập!</strong>
                    </a>
                  </div>
                  <div className="container-btn d-flex justify-content-end pt-3">
                    <button
                      type="button"
                      className="btn-reset btn btn-light btn-lg mb-3"
                    >
                      Đặt lại
                    </button>
                    <button
                      type="submit"
                      className="btn-register btn btn-warning btn-lg ms-2 mb-3"
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
