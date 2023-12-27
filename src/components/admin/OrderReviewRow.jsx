import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import { admin_headers, headers } from "../../axios_helper/axios_helper";
import CaptureOrderModal from "../alert/CaptureOrderModal";

const OrderReviewRow = ({ ordersData }) => {
  const changeStatusHandler = (newStatus) => {
    //change order's status
    ordersData.currentStatus = newStatus;
    console.log(ordersData);
    axios
      .put(`/admin-service?id=${ordersData.id}`, ordersData, {
        headers: admin_headers,
      })
      .then((res) => {
        console.log("data=" + res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const listOfStatuses = [
    "Đang xử lý",
    "Đang đóng gói",
    "Đang vận chuyển",
    "Đã giao",
    "Đã hủy",
  ];
  const [currentStatusIdx, setCurrentStatusIdx] = useState(-1);
  useEffect(() => {
    for (let i = 0; i < listOfStatuses.length; i++) {
      if (ordersData.currentStatus === listOfStatuses[i]) {
        setCurrentStatusIdx(i);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(currentStatusIdx);
  console.log(headers);
  const captureOrder = () => {
    axios
      .put(`/admin-service/confirm-order?id=${ordersData.id}`, null, {
        headers: admin_headers,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelOrder = () => {
    axios
      .put(`/admin-service/cancel-order?id=${ordersData.id}`, null, {
        headers: admin_headers,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "OK") {
          alert("Đã hủy");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const determineClassName = () => {
    if (
      ordersData.currentStatus === "Đã hủy" ||
      ordersData.currentStatus === "Khách hàng đã hủy đơn"
    ) {
      return "text-danger";
    } else if (ordersData.currentStatus === "Đã giao") {
      return "text-success";
    } else if (ordersData.currentStatus === "Đã hoàn tiền") {
      return "text-primary";
    } else {
      return ""; // Hoặc className mặc định của bạn nếu không có điều kiện nào khớp
    }
  };

  return (
    <>
      <CaptureOrderModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        id={ordersData.id}
        totalAmount={ordersData.totalAmount.toLocaleString()}
      />
      <tr
        className={
          ordersData.currentStatus === "Chờ xác nhận" ? "new-order" : ""
        }
      >
        <td>{ordersData.id}</td>
        <td>{ordersData.cus}</td>
        <td>{new Date(ordersData.orderDate).toLocaleString()}</td>
        <td>{ordersData.totalAmount.toLocaleString()}đ</td>
        <td>
          <b className={determineClassName()}>
            <span>{ordersData.currentStatus}</span>
          </b>
        </td>
        <td>
          {ordersData.currentStatus === "Chờ xác nhận" ? (
            <div className="capture-btn-container">
              <button
                className="capture-btn"
                onClick={() => openModal(ordersData.id)}
              >
                <IoCheckmarkSharp className="icon" />
                Duyệt
              </button>
              <button className="cancel-btn" onClick={() => cancelOrder()}>
                <IoCloseSharp className="icon" />
                Hủy
              </button>
            </div>
          ) : (
            <div>
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={
                    ordersData.currentStatus === "Khách hàng đã hủy đơn" ||
                    ordersData.currentStatus === "Đã hủy" ||
                    ordersData.currentStatus === "Đã giao" ||
                    ordersData.currentStatus === "Đã hoàn tiền"
                      ? true
                      : false
                  }
                >
                  Thay Đổi Trạng Thái
                </button>
                <ul class="dropdown-menu">
                  {listOfStatuses.map((sts, idx) => {
                    return (
                      <li>
                        <a
                          className={
                            (idx === currentStatusIdx + 1 &&
                              currentStatusIdx !== listOfStatuses.length - 2) ||
                            (idx === listOfStatuses.length - 1 &&
                              currentStatusIdx !== listOfStatuses.length - 2)
                              ? "can-sts-link dropdown-item"
                              : "cannotChange-sts-link dropdown-item"
                          }
                          onClick={() => {
                            changeStatusHandler(sts);
                          }}
                        >
                          {sts}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <Link to={`order-details/${ordersData.id}`}>Xem chi tiết</Link>
              </div>
            </div>
          )}
          {/* <!-- Modal --> */}
          <div
            class="confirmationModal modal fade"
            tabindex="-1"
            aria-labelledby="confirmationModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Xác nhận trạng thái đơn hàng</h5>
                  {/* <!-- dấu x trên cùng bên phải --> */}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {/* <!-- Nội dung modal sẽ được thay đổi bằng JavaScript --> */}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Hủy bỏ
                  </button>
                  <button type="button" class="confirmButton btn btn-primary">
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default OrderReviewRow;
