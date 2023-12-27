import React from "react";
import AllOrders from "./AllOrders";

const OrderOption = ({ option, orders }) => {
  console.log(option);
  return <AllOrders orders={orders} />;

  // if (option === "all") {
  //   return <AllOrders orders={orders} />;
  // } else if (option === "processing") {
  //   return <></>;
  // } else if (option === "delivering") {
  //   return <></>;
  // } else if (option === "delivered") {
  //   return <></>;
  // } else if (option === "canceled") {
  //   return <></>;
  // } else {
  //   return <></>;
  // }
};

export default OrderOption;
