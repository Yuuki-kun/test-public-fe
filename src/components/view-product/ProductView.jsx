import React, { useCallback, useContext, useEffect, useState } from "react";
import { getProductDetails } from "../../axios_helper/axios_helper";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import ImageViewer from "react-simple-image-viewer";
import ReactStars from "react-stars";
import "./product-view.css";
import { ShopContext } from "../../context/BookContext";

const ProductView = () => {
  const { id } = useParams();
  const { addToCart } = useContext(ShopContext);

  // console.log(bookItem);
  const [productInfor, setProductInfor] = useState(
    useEffect(() => {
      getProductDetails(id)
        .then((res) => {
          setProductInfor(res);
        })
        .catch((err) => {
          console.log(err);
          setProductInfor(null);
        });
    }, [id]) || null
  );
  //   useEffect(() => {
  //     getProductDetails(id)
  //       .then((res) => {
  //         setProductInfor(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setProductInfor(null);
  //       });
  //   }, [id]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  console.log(productInfor);

  return (
    <>
      {productInfor === null ? (
        <div>Chọn sản phẩm để xem thông tin.</div>
      ) : (
        <div className="container product-view-info">
          <div className="row">
            <div className="img-view-container col-3">
              <div className="current-img">
                <img src={productInfor.img} alt="" className="img-fluid" />
              </div>
              <div className="slider-details-img">
                <Slider {...settings}>
                  {productInfor !== null &&
                    productInfor.details_images.map((src, index) => (
                      <img
                        className="img-img"
                        src={src}
                        onClick={() => openImageViewer(index)}
                        width="300"
                        key={index}
                        style={{ margin: "2px" }}
                        alt=""
                      />
                    ))}
                </Slider>
                {isViewerOpen && (
                  <ImageViewer
                    src={
                      productInfor !== null ? productInfor.details_images : []
                    }
                    currentIndex={currentImage}
                    disableScroll={true}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                    backgroundStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="details-container col-6">
              <div className="book-short-info">
                <h5>{productInfor.ten}</h5>
                <p>Tác giả: {productInfor.tac_gia}</p>
                <p>{productInfor.theloai}</p>
                <div className="details-rating">
                  <ReactStars value={productInfor.rating} edit={false} />
                  <p>(số lượng đánh giá)</p>
                  <p>Đã bán: {productInfor.soluong_daban}+</p>
                </div>
                <h4>
                  {(productInfor.don_gia * 1000).toLocaleString("en-US")} đ
                </h4>
              </div>
              <div className="book-full-details-info">
                <p>Thông tin chi tiết</p>
                <p>Hàng chính hãng: hàng chính hãng</p>
                <p>Còn hàng: {productInfor.trang_thai}</p>
                <p>Công ty phát hành: Nhà xuất bản {productInfor.nxb}</p>
                <p>
                  Ngày xuất bản:{" "}
                  {`${productInfor.ngay_xb[2]}-${productInfor.ngay_xb[1]}-${productInfor.ngay_xb[0]}`}
                </p>
                <p>Kích thước: 18 x 25 cm</p>
                <p>Loại bìa: bìa cứng</p>
                <p>Số trang:</p>
                <p>Nhà xuất bản: Nhà xuất bản {productInfor.nxb}</p>
              </div>
              <div className="book-details-description">
                <p>Mô tả sản phẩm</p>
                <p>{productInfor.mo_ta}</p>
              </div>
            </div>
            <div className="purchase-container col-3">
              <div className="action-button">
                <button onClick={() => addToCart(productInfor.id)}>
                  Thêm và giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
