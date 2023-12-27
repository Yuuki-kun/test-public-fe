import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const AllOrders = ({ orders }) => {
  console.log(orders);
  const cancelOrder = (id) => {
    console.log(id);
    axios
      .put(`/order/cancel-order?id=${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let totalAmount = 0;

  return (
    <>
      <div className="all-orders">
        {orders.reverse().map((order) => {
          return (
            <div className="my-order" key={order.id}>
              <div className="order-status">
                <div>
                  <b>{order.status}</b>
                  <p>{new Date(order.dateTime).toLocaleString()}</p>
                  <p>Giao đến: {order.billingAddress}</p>
                  <b>{order.paymentMethod}</b>
                </div>
                <div>
                  <button
                    onClick={() => {
                      cancelOrder(order.id);
                    }}
                    disabled={order.status === "Chờ xác nhận" ? false : true}
                    className={
                      order.status === "Chờ xác nhận"
                        ? "cus-cancel-order active"
                        : "cus-cancel-order nonactive"
                    }
                  >
                    Hủy đơn hàng
                  </button>
                </div>
              </div>
              {order.items.map((item, idx) => {
                console.log("Order ID = " + order.id);
                if (idx === 0) totalAmount = 0;
                totalAmount += item.price;

                return (
                  <div className="item" key={order.id * 1000 + idx}>
                    <div className="item-name">
                      <img
                        src={item.img}
                        alt="order"
                        className="tracking-order-img img-fluid"
                      />
                      <p>{item.name}</p>
                    </div>
                    <div className="item-price">
                      <b>{item.price}đ</b>
                    </div>
                  </div>
                );
              })}

              <div className="order-footer">
                <b>Tổng: {totalAmount.toLocaleString()}đ</b>
                <Link
                  className="tracking-order-link"
                  to={`/customer/order-tracking/${order.id}`}
                >
                  Theo dõi đơn hàng
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllOrders;
