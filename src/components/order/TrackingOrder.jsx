import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderInfo } from "../../axios_helper/axios_helper";
import "./tracking.css";
import Progress from "./Progress";

const TrackingOrder = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
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
  console.log(orderDetails.statusDtos);
  let orderTrackingItems;
  let reversedStatusDtos;
  if (orderDetails && orderDetails.statusDtos) {
    reversedStatusDtos = [...orderDetails.statusDtos].reverse();
    orderTrackingItems = orderDetails.items;
  }

  return (
    <>
      <div className="container order-tracking-container">
        <div className="row">
          <div className="col-8 ms-0 ps-0">
            <div className="order-container">
              <p className="order-tracking-header">Theo dõi đơn hàng</p>
              {/* <Progress tracking={"Đang vận chuyển"} isCurrently={true} />
              <Progress tracking={"Đang vận chuyển"} />
              <Progress tracking={"Đang vận chuyển"} />
              <Progress tracking={"Chờ xác nhận"} /> */}
              {reversedStatusDtos ? (
                reversedStatusDtos.map((orderStatus, idx) => {
                  return (
                    <Progress
                      tracking={orderStatus.trangThai.ttTrangThai}
                      isCurrently={idx === 0 ? true : false}
                      datetime={orderStatus.statusChangeDate}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="col-4 order-details-container">
            <div className="order-details">
              <p>Thông tin đơn hàng</p>
              {orderDetails && orderDetails.paymentDto && (
                <b>
                  Tổng: {orderDetails.paymentDto.totalAmount.toLocaleString()}đ
                </b>
              )}
              <div className="order-tracking-items">
                {orderTrackingItems &&
                  orderTrackingItems.map((item, idx) => {
                    return (
                      <div className="tracking-item desc">
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

export default TrackingOrder;
