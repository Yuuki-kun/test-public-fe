import React, { useContext, useEffect, useState } from "react";

import Login from "../login/Login";
import "./cart.css";
import { ShopContext } from "../../context/BookContext";
import CartItem from "./CartItem";
import { GoTrash } from "react-icons/go";
import DeleteItemModal from "../alert/DeleteItemModal";
import { CartContext } from "../../context/CartContext";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const Cart = ({ loggedIn }) => {
  //scroll event
  // window.addEventListener("scroll", function () {
  //   const scrollY = window.scrollY;

  //   const psDiv = document.querySelector(".checkout-info");

  //   if (psDiv !== null) {
  //     if (scrollY >= 200) {
  //       psDiv.style.position = "fixed";
  //       psDiv.style.top = "140px"; // Thay đổi top tùy theo vị trí mong muốn
  //       psDiv.style.right = "30px"; // Thay đổi top tùy theo vị trí mong muốn
  //       psDiv.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
  //       psDiv.style.transition = "box-shadow 0.5s ease-in-ou";
  //     } else {
  //       psDiv.style.position = "static";
  //       psDiv.style.boxShadow = "none";
  //     }
  //   }
  // });

  const { cartItems, getItemByID } = useContext(ShopContext);
  const { checkoutHandler } = useContext(CartContext);
  const cartItemsArray = Object.values(cartItems);

  const [addressForm, setAddressForm] = useState({
    address: "",
    province: "",
    city: "",
    postalCode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };

  // const [amount, setAmount] = useState(0);

  const [selectedItems, setSelectedItem] = useState([]);

  const toggleCheck = (itemId) => {
    const updatedSelection = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];
    setSelectedItem(updatedSelection);
  };

  const [isSelectAll, setIselectAll] = useState(false);
  const selectAll = () => {
    if (selectedItems.length === cartItemsArray.length) {
      setSelectedItem([]);
      setIselectAll(false);
    } else {
      const allItemIds = cartItemsArray.map((item) => item.itemId);
      setSelectedItem(allItemIds);
      setIselectAll(true);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemcartId, setItemCartId] = useState("");
  const openModal = (id) => {
    setIsModalOpen(true);
    setItemCartId(id);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectedProductsSoluong = cartItemsArray.filter((itemcart) =>
    selectedItems.includes(itemcart.itemId)
  );

  //selected product id + soluong
  // selectedProductsSoluong.map((item) => console.log(item));

  let totalAmount = 0;
  for (let i = 0; i < selectedProductsSoluong.length; i++) {
    // console.log(selectedProductsSoluong[i]);
    totalAmount +=
      Number(getItemByID(selectedProductsSoluong[i].itemId).don_gia) *
      selectedProductsSoluong[i].soluong *
      1000;
  }
  console.log(totalAmount);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.id);
  };

  //contain [id, soluong]
  // console.log(cartItemsArray);

  console.log("payment = " + paymentMethod);
  console.log(addressForm);
  console.log("cart=" + cartItemsArray.length);
  return (
    <>
      {!loggedIn ? (
        <Login />
      ) : (
        <div className="cart-section container">
          <DeleteItemModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            id={itemcartId}
          />
          {cartItemsArray.length !== 0 ? (
            <div className="row">
              <div className="col-12">
                <div>
                  <span>GIỎ HÀNG</span>
                </div>
              </div>

              <div className="col-9 d-flex justify-content-between">
                <div>
                  <button
                    onClick={selectAll}
                    className={isSelectAll ? "chooseAlls" : "noChooseAlls"}
                  >
                    {isSelectAll ? "Bỏ chọn" : "Chọn tất cả"}
                  </button>
                  <span>({cartItemsArray.length} sản phẩm)</span>
                </div>
                <div>
                  <GoTrash className="deleteAlls" />
                  <span>Xóa tất cả</span>
                </div>
              </div>
              <div className="col-3">
                <div>thông tin thanh toán</div>
              </div>
              <div className="col-9 purchase-info">
                {cartItemsArray.map((item) => {
                  // console.log(item.itemId);
                  return (
                    <CartItem
                      item={item}
                      key={item.id}
                      isChecked={selectedItems.includes(item.itemId)}
                      onToggleCheck={toggleCheck}
                      openModal={openModal}
                    />
                  );
                })}
              </div>

              <div className="col-3 checkout-info">
                <div className="amount-payment payment-method">
                  <h6>Chọn phương thức thanh toán</h6>
                  <div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => handleChangePaymentMethod(e)}
                    />
                    <label htmlFor="cash">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => handleChangePaymentMethod(e)}
                    />
                    <label htmlFor="card">Thanh toán bằng thẻ</label>
                  </div>
                </div>
                {paymentMethod === "cash" && (
                  <div className="shipping-address">
                    <form
                      className="shipping-form"
                      action="
                  "
                    >
                      <h6>Giao tới</h6>

                      <div className="shipping-input">
                        <label htmlFor="address">Địa chỉ</label>
                        <textarea
                          type="text"
                          id="address"
                          name="address"
                          value={addressForm.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="shipping-input">
                        <label htmlFor="province">Tỉnh</label>
                        <input
                          type="text"
                          name="province"
                          id="province"
                          value={addressForm.province}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="shipping-input">
                        <label htmlFor="city">Thành phố</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={addressForm.city}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="shipping-input">
                        <label htmlFor="postalCode">Mã bưu điện</label>
                        <input
                          type="number"
                          id="postalCode"
                          name="postalCode"
                          value={addressForm.postalCode}
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  </div>
                )}
                <div className="amount-payment">
                  <div className="total-amount">
                    <p>Tạm tính</p>
                    <span>
                      {totalAmount <= 0
                        ? totalAmount
                        : totalAmount.toLocaleString()}
                      <sup>₫</sup>
                    </span>
                  </div>
                  <div className="total-amount">
                    <p>Giảm giá</p>
                    <span>
                      {/* {totalAmount <= 0 ? totalAmount : totalAmount.toFixed(3)} */}
                      0<sup>₫</sup>
                    </span>
                  </div>
                  <div className="total-amount">
                    <p>Tổng</p>
                    <span>
                      {/* {totalAmount <= 0 ? totalAmount : totalAmount.toFixed(3)} */}
                      {selectedItems.length} (sản phẩm)
                    </span>
                  </div>
                  <div className="underline"></div>
                  <div className="total-amount">
                    <div>Tổng tiền</div>
                    <span>
                      {selectedItems.length <= 0 ? (
                        "Vui lòng chọn sản phẩm"
                      ) : (
                        <div>
                          {totalAmount.toLocaleString()}
                          <sup>₫</sup>
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="orderBtn">
                    <button
                      onClick={() => {
                        setAddressForm({
                          address: "",
                          province: "",
                          city: "",
                          postalCode: "",
                        });
                        checkoutHandler(
                          paymentMethod,
                          selectedProductsSoluong,
                          addressForm
                        );
                      }}
                    >
                      Mua Ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <div className="d-flex align-items-center">
                <div className="icon-empty-container">
                  <PiShoppingCartSimpleThin
                    size={"120px"}
                    className="cart-icon"
                  />
                </div>
                <div>
                  <Link to={"/"}>Tiếp tục mua sắm</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
