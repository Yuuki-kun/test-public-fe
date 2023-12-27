import React, { useEffect, useState } from "react";
import { getReviewOrders } from "../../axios_helper/axios_helper";
import OrderReviewRow from "./OrderReviewRow";
import Login from "../login/Login";

const AdminOrderManagement = () => {
  useEffect(() => {
    // Thay đổi tiêu đề trang khi component được mount
    document.title = "Admin";

    // Cleanup: Đặt lại tiêu đề khi component unmount
    return () => {
      document.title = "Admin";
    };
  }, []);

  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getReviewOrders();
        if (result) {
          setOrders(result.reverse());
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setLoading(false);
  }, []);
  console.log(orders && orders);
  if (orders === "unauthorize") {
    return <Login />;
  }
  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div class="container-main-page col-11 p-0">
          <div class="contaienr-title contaienr-title-order ms-lg-0 ms-5 me-3 gap-md-0 gap-4">
            <div class="px-3">Danh Sách Đơn Hàng</div>
            <div id="time-display"></div>
          </div>
          <div class="bg-light me-3 rounded-3 p-4 ms-lg-1 ms-5">
            <div class="container-head-order d-flex flex-md-row flex-column-reverse gap-md-0 gap-3 justify-content-between align-items-center">
              <button class="clearAllOrder-order">Xóa Tất Cả</button>

              <div class="dropdown">
                <span>Hiện </span>
                <button
                  class="btn btn-secondary dropdown-toggle bg-light text-black"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  10
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item active" type="button">
                      10
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      25
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      50
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      100
                    </button>
                  </li>
                </ul>
                <span> Danh mục</span>
              </div>

              <div>
                <form>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm kiếm..."
                    />
                    <button class="btn btn-primary" type="button">
                      Tìm
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="table-infor-order mt-3">
              <table>
                <thead class="title-table-order">
                  <tr>
                    <th>ID Đơn Hàng</th>
                    <th>Khách Hàng</th>
                    <th>Ngày Đặt</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                    <th>Chức Năng</th>
                  </tr>
                </thead>
                <tbody class="data-table-order">
                  {orders &&
                    orders.map((order) => {
                      return <OrderReviewRow ordersData={order} />;
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderManagement;
