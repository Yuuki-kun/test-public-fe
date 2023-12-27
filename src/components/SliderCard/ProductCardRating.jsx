//có sao, nút mua hàng tuỳ vào giá trị canAddToCartCard

import React, { useContext } from "react";
import ReactStars from "react-stars";
import { ShopContext } from "../../context/BookContext";
import { Link } from "react-router-dom";

const ProductCardRating = ({ canAddToCartCard, book }) => {
  const { addToCart } = useContext(ShopContext);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleAddToCart = (id) => {
    addToCart(id);
    const notification = document.createElement("div");
    notification.className = "notification";

    // Tạo ảnh
    const image = document.createElement("img");
    image.src = book != null ? book.img : "img";
    image.alt = "Custom Image";

    const contentDiv = document.createElement("div");
    contentDiv.className = "content-div";

    // Tạo phần tử p thứ nhất
    const firstParagraph = document.createElement("p");
    firstParagraph.textContent = "Đã thêm vào giỏ";
    firstParagraph.className = "add-notifi";

    const secondParagraph = document.createElement("p");
    secondParagraph.textContent = book && book.ten;
    secondParagraph.className = "bname-notifi";

    contentDiv.appendChild(firstParagraph);
    contentDiv.appendChild(secondParagraph);

    notification.appendChild(image);
    notification.appendChild(contentDiv);

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("hidden");

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 700);
    }, 3000);
  };

  return (
    <>
      <div
        // to={`/productInfo/${book.id}`}
        className="card"
        onClick={() => {
          console.log(book.id);
        }}
      >
        <div className="product">
          <Link to={`/productInfo/${book.id}`}>
            <div className="img">
              <img
                src={book != null ? book.img : "img"}
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className="product-infor">
              <div className="content">
                <h3 className="desc">{book != null && book.ten}</h3>
              </div>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={19}
                color2={"#ffd700"}
                value={book != null && book.rating}
                edit={false}
              />
              <div className="price">
                <div className="current-price">
                  {book != null &&
                    (Number(book.don_gia) * 1000).toLocaleString()}
                  đ
                </div>
              </div>
            </div>
          </Link>
          {canAddToCartCard && (
            <div className="addToCardButton">
              <button onClick={() => handleAddToCart(book.id)}>
                Thêm vào giỏ
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCardRating;
