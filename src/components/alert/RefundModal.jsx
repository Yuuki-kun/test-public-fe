import React, { useContext, useEffect } from "react";
import "./style.css";
import Modal from "react-modal";
import { CartContext } from "../../context/CartContext";
import { ShopContext } from "../../context/BookContext";
import { admin_headers } from "../../axios_helper/axios_helper";
import axios from "axios";

const RefundModal = ({ isModalOpen, closeModal, id, totalAmount }) => {
  useEffect(() => {
    Modal.setAppElement("body");

    return () => {
      Modal.setAppElement(null);
    };
  }, []);

  const refundHandler = () => {
    axios
      .put(`/admin-service/refund-payment?id=${id}`, null, {
        headers: admin_headers,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        className="delete-item-modal"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thông báo"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            // width: "350px",
            // height: "200px",
            margin: "auto",
            marginTop: "20%",
          },
        }}
      >
        <h2>Hoàn tiền</h2>
        <p>Hoàn tiền {totalAmount}?</p>
        <button className="xac-nhan" onClick={refundHandler}>
          Xác nhận
        </button>
        <button className="huy" onClick={closeModal}>
          Hủy
        </button>
      </Modal>
    </>
  );
};

export default RefundModal;
