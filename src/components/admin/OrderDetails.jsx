import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { admin_headers, getOrderInfo } from "../../axios_helper/axios_helper";
import Progress from "../order/Progress";
import { TiDeleteOutline } from "react-icons/ti";
import { RiRefund2Line } from "react-icons/ri";
import { FaFileDownload } from "react-icons/fa";

import axios from "axios";
import RefundModal from "../alert/RefundModal";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [selectValues, setSelectValues] = useState([]);

  console.log(id);
  useEffect(() => {
    getOrderInfo(id)
      .then((order) => {
        setOrderDetails(order);
      })
      .catch((e) => {
        console.log(e);
        setOrderDetails({});
      });
  }, [id]);

  let orderTrackingItems;
  let reversedStatusDtos;
  if (orderDetails && orderDetails.statusDtos) {
    reversedStatusDtos = [...orderDetails.statusDtos].reverse();
    orderTrackingItems = orderDetails.items;
  }

  console.log(orderDetails);
  console.log(selectValues);
  const refundHandler = () => {
    axios
      .put(`/admin-service/refund-payment?id=${orderDetails.id}`, null, {
        headers: admin_headers,
      })
      .then((res) => {
        console.log(res);
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

  console.log(orderDetails);

  return (
    <>
      <div class="admin-tracking-order container-main-page col-11 p-0">
        <RefundModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          id={orderDetails !== null && orderDetails.id}
          totalAmount={
            (orderDetails?.paymentDto?.totalAmount * 1000).toLocaleString() || 0
          }
        />
        <div className="row">
          <div className="col-12 order-details-action">
            <p>Đơn hàng #{orderDetails.id}</p>
            <button className="refund-btn" onClick={() => openModal()}>
              <RiRefund2Line size={"2rem"} />
              Hoàn tiền
            </button>
            <Link to={`/admin/order-management/invoice/${orderDetails.id}`}>
              <FaFileDownload size={"1.5rem"} />
              Tải hóa đơn
            </Link>
          </div>
          <div className="col-4 ms-0">
            <div className="order-container order-details-container">
              <p className="order-tracking-header">Theo dõi đơn hàng</p>
              {reversedStatusDtos ? (
                reversedStatusDtos.map((orderStatus, idx) => {
                  return (
                    <div className="order-tracking">
                      <div className="progress-order">
                        <span
                          className={
                            idx === 0
                              ? "tracking-milestone current"
                              : "tracking-milestone"
                          }
                        ></span>
                        <span className="tracking-line"></span>
                      </div>
                      <div
                        className={
                          idx === 0
                            ? "order-tracking-content current"
                            : "order-tracking-content"
                        }
                      >
                        <p>{orderStatus.trangThai.ttTrangThai}</p>
                        <p>
                          Thời gian:
                          {new Date(
                            orderStatus.statusChangeDate
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          {orderDetails && orderDetails.customerDto && (
            <div className="cus-info-container order-details-container">
              <div className="order-details">
                <p>Thông tin khách hàng</p>
                <div className="cus-info-row">
                  <p>Khách hàng: </p>
                  <p>{orderDetails.customerDto.name}</p>
                </div>
                <div className="cus-info-row">
                  <p>Điện thoại: </p>
                  <p>{orderDetails.customerDto.phoneNumber}</p>
                </div>
                <p>Thông tin thanh toán</p>
                <div className="cus-info-row">
                  <p>Ngày đặt hàng: </p>
                  <p>
                    {new Date(
                      orderDetails.paymentDto.paymentDate
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="cus-info-row">
                  <p>Phương thức thanh toán: </p>
                  <p>
                    {orderDetails.paymentDto.paymentMethod === "card"
                      ? "Thanh toán bằng thẻ tín dụng"
                      : "Thanh toán bằng tiền mặt khi nhận hàng"}
                  </p>
                </div>
                <div className="cus-info-row">
                  <p>Tổng giá trị đơn hàng: </p>
                  <p>{orderDetails.paymentDto.totalAmount.toLocaleString()}đ</p>
                </div>
                <p>Thông tin vận chuyển: </p>
                <div className="cus-info-row">
                  <p>Địa chỉ: </p>
                  <p>{orderDetails.paymentAddressDto.dcghDiaChi}</p>
                </div>
                <div className="cus-info-row">
                  <p>Thành phố: </p>
                  <p>{orderDetails.paymentAddressDto.dcghThanhPho}</p>
                </div>
                <div className="cus-info-row">
                  <p>Tỉnh: </p>
                  <p>{orderDetails.paymentAddressDto.dcghTinh}</p>
                </div>
                <div className="cus-info-row">
                  <p>Quốc gia: </p>
                  <p>{orderDetails.paymentAddressDto.dcghQuocGia}</p>
                </div>
                <div className="cus-info-row">
                  <p>PostalCode: </p>
                  <p>{orderDetails.paymentAddressDto.postalCode}</p>
                </div>
              </div>
            </div>
          )}
          <div className="col-4 order-details-container">
            <div className="order-details">
              <p>Kiện hàng gồm:</p>
              <div className="order-tracking-items">
                {orderTrackingItems &&
                  orderTrackingItems.map((item, idx) => {
                    return (
                      <div className="tracking-item">
                        <img src={item.img} alt="img" className="img-fluid" />
                        <div className="tracking-item-info">
                          <p>{item.name}</p>
                          <div className="tracking-item-qty">
                            <span>x{item.qty}</span>
                            <p>{item.price}đ</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
