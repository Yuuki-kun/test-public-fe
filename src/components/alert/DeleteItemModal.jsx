import React, { useContext, useEffect } from "react";
import "./style.css";
import Modal from "react-modal";
import { CartContext } from "../../context/CartContext";
import { ShopContext } from "../../context/BookContext";
const DeleteItemModal = ({ isModalOpen, closeModal, id }) => {
  useEffect(() => {
    Modal.setAppElement("body");

    return () => {
      Modal.setAppElement(null);
    };
  }, []);
  const { deleteItem } = useContext(ShopContext);
  const handleDelete = () => {
    deleteItem(id);
    console.log(id);
    closeModal();
  };
  console.log(id);

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
        <h2>Xóa sản phẩm</h2>
        <p>Bạn có muốn xóa sản phẩm đang chọn?</p>
        <button className="xac-nhan" onClick={handleDelete}>
          Xác nhận
        </button>
        <button className="huy" onClick={closeModal}>
          Hủy
        </button>
      </Modal>
    </>
  );
};

export default DeleteItemModal;
