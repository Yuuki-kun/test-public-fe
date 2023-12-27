import React from "react";

const CheckoutSuccess = () => {
  return (
    <div class="container ck">
      <div class="d-flex justify-content-center">
        <img class="icon-checkout-sc" src="./images/CheckOut.jpg" alt="" />
      </div>
      <div class="content-checkout-sc">
        <div class="title-checkout-sc text-center">
          <h1>Cảm ơn bạn đã đặt hàng!</h1>
        </div>
        <div>
          <p class="mb-1">Mã số đơn hàng của bạn:</p>
          <div class="d-flex text-center">
            <p class="order-number-checkout-sc">XXX-XXX-XXX-XXX</p>
          </div>
          <p>
            Bạn có thể xem lại đơn hàng{" "}
            <a href="#" class="text-decoration-none">
              tại đây!
            </a>
          </p>
          <p class="ps-1">
            <i class="fa-solid fa-truck-ramp-box fa-2x"></i> Thời gian gian giao
            hàng dự kiến từ 2-3 ngày làm việc, không kể thứ 7, chủ nhật
          </p>
          <p>
            Thông tin chi tiết về đơn hàng được gửi về địa chỉ:{" "}
            <span class="text-success">tcm@gmail.com</span>!
          </p>
        </div>
        <div class="question-checkout-sc mt-4 pt-3">
          <p class="fs-4 mb-2">Các câu hỏi thường gặp.</p>
          <div class="d-flex flex-column">
            <a href="#" class="text-decoration-none">
              Xác nhận đơn hàng như thế nào?
            </a>
            <a href="#" class="text-decoration-none">
              Thời gian giao hàng
            </a>
            <a href="#" class="text-decoration-none">
              Chính sách đổi trả
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
