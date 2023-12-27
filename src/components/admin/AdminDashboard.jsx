import React from "react";

const AdminDashboard = () => {
  return (
    <>
      <div class="container-main-page col-11 p-0 pt-4">
        <div class="contaienr-title ms-lg-0 ms-5">
          <div class="px-3">Tổng Quan</div>
          <div id="time-display"></div>
        </div>

        <div class="container-statistical-dashboard ms-lg-0 ms-sm-4 ms-3 d-flex flex-wrap justify-content-between align-items-stretch">
          <div class="cardBox-dashboard view d-flex flex-fill justify-content-between ">
            <div>
              <div class="number-dashboard">1,945</div>
              <div class="cardName">Daily view</div>
            </div>
            <div>
              <i class="fa-regular fa-eye"></i>
            </div>
          </div>

          <div class="cardBox-dashboard product d-flex flex-fill justify-content-between">
            <div>
              <div class="number-dashboard">80</div>
              <div class="cardName">Sales</div>
            </div>
            <div>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>

          <div class="cardBox-dashboard comment d-flex flex-fill justify-content-between">
            <div>
              <div class="number-dashboard">284</div>
              <div class="cardName">Comment</div>
            </div>
            <div>
              <i class="fa-regular fa-comments"></i>
            </div>
          </div>

          <div class="cardBox-dashboard earning d-flex flex-fill justify-content-between">
            <div>
              <div class="number-dashboard">$100</div>
              <div class="cardName">Earning</div>
            </div>
            <div>
              <i class="fa-solid fa-money-bill-wave"></i>
            </div>
          </div>
        </div>

        <div class="m-0 mb-3 row gap-5">
          <div class="col-lg-7 px-lg-4 ps-5 pe-3">
            <div class="d-flex justify-content-between align-items-center pb-2">
              <div>
                <strong>Sách Bán Được Theo:</strong>
              </div>
              <div class="dropdown">
                <button
                  class="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ngày
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Tuần
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Tháng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="chart-dashboard">
              {/* <!-- Biểu Đồ Cột Được tạo bằng js --> */}
            </div>
          </div>
          <div class="col-lg-4 px-lg-0 ps-5 pe-3">
            <div class="d-flex justify-content-between pb-2 align-items-center">
              <div>
                <strong>Sách Bán Chạy Theo:</strong>
              </div>
              <div class="dropdown">
                <button
                  class="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ngày
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Tuần
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Tháng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="selling-products-dashboard overflow-auto p-0">
              <div class="title-selling-dashboard">
                <div>Ảnh Sách</div>
                <div>Tên Sách</div>
                <div>Giá</div>
              </div>
              <div class="product-selling-dashboard">
                <div class="selling-image-dashborad">
                  <img src="/pic/DiTimLeSong.jpg" alt="" />
                </div>
                <div class="selling-desciption-dashboard">
                  Sách Đi Tìm Lẽ Sống
                </div>
                <div class="selling-price-dashboard">129.000đ</div>
              </div>
              <div class="product-selling-dashboard">
                <div class="selling-image-dashborad">
                  <img src="/pic/DiTimLeSong.jpg" alt="" />
                </div>
                <div class="selling-desciption-dashboard">
                  Sách Đi Tìm Lẽ Sống
                </div>
                <div class="selling-price-dashboard">129.000đ</div>
              </div>
              <div class="product-selling-dashboard">
                <div class="selling-image-dashborad">
                  <img src="/pic/DiTimLeSong.jpg" alt="" />
                </div>
                <div class="selling-desciption-dashboard">
                  Sách Đi Tìm Lẽ Sống
                </div>
                <div class="selling-price-dashboard">129.000đ</div>
              </div>
              <div class="product-selling-dashboard">
                <div class="selling-image-dashborad">
                  <img src="/pic/DiTimLeSong.jpg" alt="" />
                </div>
                <div class="selling-desciption-dashboard">
                  Sách Đi Tìm Lẽ Sống
                </div>
                <div class="selling-price-dashboard">129.000đ</div>
              </div>
              <div class="product-selling-dashboard">
                <div class="selling-image-dashborad">
                  <img src="/pic/DiTimLeSong.jpg" alt="" />
                </div>
                <div class="selling-desciption-dashboard">
                  Sách Đi Tìm Lẽ Sống
                </div>
                <div class="selling-price-dashboard">129.000đ</div>
              </div>
              <div class="product-selling-dashboard">
                <div class="selling-image-dashborad">
                  <img src="/pic/DiTimLeSong.jpg" alt="" />
                </div>
                <div class="selling-desciption-dashboard">
                  Sách Đi Tìm Lẽ Sống
                </div>
                <div class="selling-price-dashboard">129.000đ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
