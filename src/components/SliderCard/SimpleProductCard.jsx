//không có nút mua hàng. không có sao

import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/BookContext";
import { getProductDetails } from "../../axios_helper/axios_helper";
import { Link } from "react-router-dom";

const SimpleProductCard = ({ bookItem }) => {
  // const handleCardClick = () => {
  //   // console.log(bookItem);
  //   let productInfor;
  //   getProductDetails(bookItem.id)
  //     .then((res) => {
  //       console.log(res);
  //       productInfor = res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       productInfor = null;
  //     });
  // };

  return (
    <>
      <Link className="card" to={`/productInfo/${bookItem.id}`}>
        <div className="product">
          <div className="img">
            <img
              src={bookItem != null ? bookItem.img : "img"}
              alt="img"
              className="img-fluid"
            />
          </div>
          <div className="product-infor">
            <div className="content">
              <h3 className="desc">{bookItem != null && bookItem.ten}</h3>
            </div>
            <div className="price">
              <div className="current-price">
                {bookItem != null &&
                  (Number(bookItem.don_gia) * 1000).toLocaleString()}
                đ
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SimpleProductCard;
