import React, { useCallback, useContext, useEffect, useState } from "react";
import OrderOption from "../order/OrderOption";
import axios from "axios";
import { ShopContext } from "../../context/BookContext";

const Orders = () => {
  const [orderItemData, setOrderItemData] = useState([]);
  const { user_login_info } = useContext(ShopContext);
  const [orderSelect, setOrderSelect] = useState("");
  const selectOrder = useCallback(
    (option) => {
      setOrderSelect(option);

      axios
        .get(
          `/order/${option}?email=${
            JSON.parse(user_login_info.user_info).email
          }`,
          {}
        )
        .then((res) => {
          console.log(res.data);
          setOrderItemData(res.data);
        })
        .catch((e) => console.log(e));
    },
    [user_login_info.user_info]
  );

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = useCallback(
    (buttonId) => {
      if (selectedButton !== null) {
        const prevButton = document.getElementById(`button-${selectedButton}`);
        prevButton.classList.remove("clicked-button");
      }

      const newButton = document.getElementById(`button-${buttonId}`);
      newButton.classList.add("clicked-button");

      setSelectedButton(buttonId);
    },
    [selectedButton]
  );

  useEffect(() => {
    handleButtonClick(1);
    selectOrder("all");
  }, [selectOrder]);

  console.log("Od=" + orderItemData);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 orders-container">
            <div className="orders-option">
              <button
                id="button-1"
                onClick={() => {
                  handleButtonClick(1);
                  selectOrder("all");
                }}
              >
                Tất cả
              </button>
              <button
                id="button-2"
                onClick={() => {
                  handleButtonClick(2);
                  selectOrder("processing");
                }}
              >
                Đang xử lý
              </button>
              <button
                id="button-3"
                onClick={() => {
                  handleButtonClick(3);
                  selectOrder("delivering");
                }}
              >
                Đang vận chuyển
              </button>
              <button
                id="button-4"
                onClick={() => {
                  handleButtonClick(4);
                  selectOrder("delivered");
                }}
              >
                Đã giao
              </button>
              <button
                id="button-5"
                onClick={() => {
                  handleButtonClick(5);
                  selectOrder("canceled");
                }}
              >
                Đã hủy
              </button>
            </div>
          </div>
          <div className="col-12">
            <OrderOption option={orderSelect} orders={orderItemData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
