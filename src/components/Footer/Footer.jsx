import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <a id="scrollToTopButton" href="#" className="scroll-top">
            <i className="fa fa-angle-up"></i>
          </a>

          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-box">
                <img
                  src="./images/logo.png"
                  alt="logo"
                  className="center-img"
                />
                <p className="slogan">Sách cho tâm hồn</p>
              </div>
              <div>
                <div className="input-group mb-1">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Nhập mail nhận tin..."
                    aria-label="Enter your Email ..."
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
                <button type="button" className="btn btn-primary">
                  Đăng ký
                </button>
                <div className="follow mt-2 mb-5">
                  <h2>Follow us on</h2>
                  <p className="socials">
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-dribbble"></i>
                    <i className="fa fa-pinterest"></i>
                    <i className="fa fa-twitter"></i>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 box-center">
              <div className="single-box">
                <h2>Thông tin về chúng tôi</h2>
                <ul>
                  <li>
                    <a href="#">Giới thiệu về công ty</a>
                  </li>
                  <li>
                    <a href="#">Đội ngũ nhân viên</a>
                  </li>
                  <li>
                    <a href="#">Sứ mệnh và giá trị cốt lõi</a>
                  </li>
                  <li>
                    <a href="#">Lịch sử phát triển</a>
                  </li>
                  <li>
                    <a href="#">Liên hệ</a>
                  </li>
                  <li>
                    <a href="#">Đánh giá từ khách hàng</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 box-padding">
              <div className="single-box">
                <h2>Hỗ trợ khách hàng</h2>
                <ul>
                  <li>
                    <a href="#">Câu hỏi thường gặp</a>
                  </li>
                  <li>
                    <a href="#">Chính sách đổi trả</a>
                  </li>
                  <li>
                    <a href="#">Hướng dẫn mua hàng</a>
                  </li>
                  <li>
                    <a href="#">Phương thức thanh toán</a>
                  </li>
                  <li>
                    <a href="#">Tạo tài khoản</a>
                  </li>
                  <li>
                    <a href="#">Thông tin vận chuyển</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="single-box">
                <h2>Bản Tin</h2>
                <ul>
                  <li>
                    <a href="#">Sách Mới Nhất</a>
                  </li>
                  <li>
                    <a href="#">Đánh Giá Sách</a>
                  </li>
                  <li>
                    <a href="#">Khuyến Mãi Đặc Biệt</a>
                  </li>
                  <li>
                    <a href="#">Góc Đọc Sách</a>
                  </li>
                  <li>
                    <a href="#">Sự Kiện Sách</a>
                  </li>
                  <li>
                    <a href="#">Thư Viện Điện Tử</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
