import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/BookContext";
import { GoTrash } from "react-icons/go";
import DeleteItemModal from "../alert/DeleteItemModal";
const CartItem = ({ item, isChecked, onToggleCheck, openModal }) => {
  const {
    getItemByID,
    addToCart,
    removeFromCart,
    updateItemAmount,
    deleteItem,
  } = useContext(ShopContext);
  const itemInfo = getItemByID(item.itemId);
  const [amount, setAmount] = useState(item.soluong);
  //   const updateItem = (e, amount) => {
  //     updateItemAmount(e.target.value, amount);
  //   };

  const handleChange = (e, itemId) => {
    const amount = Number(e.target.value);
    if (amount === 0) {
      updateItemAmount(itemId, 0);
    } else {
      setAmount(amount);
      updateItemAmount(itemId, amount);
    }
  };

  return (
    <>
      {itemInfo && (
        // <div className="col-12">
        <div className="product-info">
          <div className="left-product-info">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() =>
                onToggleCheck(
                  item.itemId,
                  Number(itemInfo.don_gia) * item.soluong,
                  !isChecked
                )
              }
              className="checkBox"
            />
            <div className="product-img">
              <img src={itemInfo && itemInfo.img} alt="" />
            </div>
            <div className="product-name">
              <h3>{itemInfo && itemInfo.ten}</h3>
            </div>
          </div>
          <div>
            <h6>
              {Number(itemInfo.don_gia).toFixed(3)}
              <sup>₫</sup>
            </h6>
          </div>
          <div className="right-product-control">
            <div className="itemAmountControl">
              {/* <div>Số lượng: {item.soluong}</div> */}
              <button
                className="control-amount decrease"
                onClick={() => {
                  if (amount === 1) {
                    openModal();
                  } else setAmount(amount - 1);
                  removeFromCart(item.itemId);
                }}
              >
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                  alt=""
                  className="img-fluid"
                />
              </button>
              <input
                type="number"
                className="item-amount-input"
                value={amount}
                onChange={(e) => handleChange(e, item.itemId)}
              />
              <button
                className="control-amount increase"
                onClick={() => {
                  setAmount(amount + 1);
                  addToCart(item.itemId);
                }}
              >
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                  alt=""
                />
              </button>
            </div>

            <GoTrash
              className="delete"
              onClick={() => {
                openModal(item.itemId);
                // deleteItem(item.itemId);
              }}
            />
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default CartItem;
