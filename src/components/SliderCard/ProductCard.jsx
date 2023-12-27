//có hai nút di chuyển

import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import ProductCardRating from "./ProductCardRating";
import { ShopContext } from "../../context/BookContext";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <BiRightArrowAlt />
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <BiLeftArrowAlt />
      </button>
    </div>
  );
};

const ProductCard = ({ canAddToCartCard, data }) => {
  // console.log("product card new arr = ", data);
  const { addToCart } = useContext(ShopContext);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  useEffect(() => {
    // Hàm xử lý sự kiện thay đổi kích thước màn hình
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Kiểm tra kích thước màn hình và cập nhật giá trị slidesToShow
  if (windowWidth <= 578) {
    settings.slidesToShow = 2;
  } else if (windowWidth <= 991 && windowWidth > 578) {
    settings.slidesToShow = 4;
  } else {
    settings.slidesToShow = 6;
  }
  return (
    <>
      <Slider {...settings}>
        {data != null &&
          data.map((book) => {
            return (
              <ProductCardRating
                key={book.id}
                canAddToCartCard={canAddToCartCard}
                book={book}
                onClick={() => {
                  console.log(book.id);
                }}
              />
            );
          })}
      </Slider>
    </>
  );
};

export default ProductCard;
