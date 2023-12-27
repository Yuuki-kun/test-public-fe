//không có hai nút di chuyển

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./slider.css";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import SimpleProductCard from "./SimpleProductCard";
import { getProductDetails } from "../../axios_helper/axios_helper";

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

const SliderCard = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  };
  useEffect(() => {
    // Hàm xử lý sự kiện thay đổi kích thước màn hình
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Đăng ký sự kiện resize
    window.addEventListener("resize", handleResize);

    // Hủy đăng ký sự kiện khi component bị hủy
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
            return <SimpleProductCard key={book.id} bookItem={book} />;
          })}
      </Slider>
    </>
  );
};

export default SliderCard;
