import "./home.css";
import { MdOutlineScience } from "react-icons/md";
import Slider from "react-slick";
import SliderCard from "../components/SliderCard/SliderCard";
import ProductCard from "../components/SliderCard/ProductCard";
import { BiBorderAll } from "react-icons/bi";
import ProductCardRating from "../components/SliderCard/ProductCardRating";
import { useContext, useEffect, useState } from "react";
import { getAllBooks } from "../axios_helper/axios_helper";
import { ShopContext } from "../context/BookContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const banner = [
    "Banner2.jpg",
    "Banner3.jpg",
    "Banner4.jpg",
    "Banner5.jpg",
    "Banner6.jpg",
    "Banner7.jpg",
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [nbxs, setNxbs] = useState([]);
  useEffect(() => {
    // Thay đổi tiêu đề trang khi component được mount
    document.title = "Home";
    axios
      .get("/api/v1/home/get-nxbs")
      .then((res) => {
        setNxbs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // Cleanup: Đặt lại tiêu đề khi component unmount
    return () => {
      document.title = "Book";
    };
  }, []);
  console.log(nbxs);
  /*
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getAllBooks()
      .then((response) => {
        setBooks(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  */
  const { books } = useContext(ShopContext);
  console.log(books);

  const newArrivals = books
    .sort((a, b) => new Date(b.ngay_xb) - new Date(a.ngay_xb))
    .slice(0, 12);

  const topSale = books.sort((a, b) => b.da_ban - a.da_ban).slice(0, 12);

  const thieuNhiBooks = [];
  const vanHocBooks = [];
  const khoahocBooks = [];

  books.forEach((book) => {
    if (book.theloai === "Thiếu Nhi") {
      thieuNhiBooks.push(book);
    } else if (book.theloai === "Khoa Học") {
      khoahocBooks.push(book);
    } else if (book.theloai === "Văn Học") {
      vanHocBooks.push(book);
    }
  });

  // const shuffledBooks = [...books]; // Tạo một bản sao của mảng books
  // shuffledBooks.sort(() => Math.random() - 0.5);

  const searchByNXB = (nxb) => {
    window.location.href = `/search?searchTerm=${nxb}`;
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="home-body container">
          <div className="row-12">
            <div className="home home-section">
              <div className="container h-container">
                <div className="row">
                  <div className="banner-container col-12 col-lg-12">
                    <Slider {...settings}>
                      {banner.map((b, idx) => {
                        return (
                          <div className="slider-card" key={idx}>
                            <div className="slider-img">
                              <img
                                src={`./images/${b}`}
                                alt="???"
                                className=""
                              />
                              {/* <div className="slider-content">
                                <p>this is content</p>
                              </div> */}
                            </div>
                          </div>
                        );
                      })}
                      {/* <div className="slider-card" key={1}>
                        <div className="slider-img">
                          <img
                            src="./images/siesta-tham-tu-da-chet.jpg"
                            alt="???"
                            className=""
                          />
                          <div className="slider-content">
                            <p>this is content</p>
                          </div>
                        </div>
                      </div>
                      <div className="slider-card" key={2}>
                        <div className="slider-img">
                          <img
                            src="./images/siesta-tham-tu-da-chet.jpg"
                            alt="???"
                            className=""
                          />
                          <div className="slider-content">
                            <p>this is content 2</p>
                          </div>
                        </div>
                      </div> */}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>

            <section className="new-arrivals home-section">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-6">
                    <div className="left">Xuất bản tháng này</div>
                  </div>
                  <div className="col-6">
                    <div className="right text-end">Xem tất cả</div>
                  </div>
                  <div className="col-12">
                    <SliderCard data={newArrivals} />
                  </div>
                </div>
              </div>
            </section>

            <section className="top-sale home-section">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-6">
                    <div className="left">Sách bán chạy</div>
                  </div>
                  <div className="col-6">
                    <div className="right text-end">Xem tất cả</div>
                  </div>
                  <div className="col-12">
                    <ProductCard data={topSale} />
                  </div>
                </div>
              </div>
            </section>

            {/* tạm thời chưa lấy db từ csdl */}
            <section className="best-category home-section">
              <div className="container">
                <div className="row">
                  <div className="cate-container">
                    <div>Thể Loại Nổi Bật</div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="cate-row-container row">
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/amthuc.jpeg"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Ẩm Thực</p>
                    </div>
                  </div>
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/khoahoc.png"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Khoa Học</p>
                    </div>
                  </div>
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/ngoaingu.png"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Ngoại Ngữ</p>
                    </div>
                  </div>
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/ngontinh.png"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Tiểu Thuyết</p>
                    </div>
                  </div>
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/sachgiaokhoa.png"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Sách Giáo Khoa</p>
                    </div>
                  </div>
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/tamly.jpg"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Tiểu Thuyết</p>
                    </div>
                  </div>
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/thieunhi.png"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Thiếu Nhi</p>
                    </div>
                  </div>
                  <div className="cate-item">
                    <div className="cate-content">
                      <img
                        src="./images/vanhoc.jpg"
                        alt="img"
                        className="img-fluid"
                      />
                      <p>Văn Học</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* sách thiếu nhi */}
            <section className="home-section sale-product">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="sale-product-heading">
                      <p>Sách Thiếu Nhi</p>
                      <div>Xem tất cả</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <ProductCard canAddToCartCard={true} data={thieuNhiBooks} />
                  </div>
                </div>
              </div>
            </section>

            <section className="home-section sale-product">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="sale-product-heading">
                      <p>Sách Văn Học</p>
                      <div>Xem tất cả</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <ProductCard canAddToCartCard={true} data={vanHocBooks} />
                  </div>
                </div>
              </div>
            </section>

            <section className="home-section sale-product">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="sale-product-heading">
                      <p>Sách Khoa Học</p>
                      <div>Xem tất cả</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <ProductCard canAddToCartCard={true} data={khoahocBooks} />
                  </div>
                </div>
              </div>
            </section>

            <section className="home-section sale-product hint-product-container">
              <div className="container">
                <div className="row">
                  <div className="col-3 nxb">
                    <h6>Nhà Xuất Bản</h6>
                    {nbxs &&
                      nbxs.map((nxb) => {
                        return (
                          <div
                            onClick={(e) => searchByNXB(nxb.nxb)}
                            className="nxb-it"
                          >
                            {nxb.nxb}
                          </div>
                        );
                      })}
                  </div>
                  <div className="col-9 list">
                    <div className="row">
                      <h6>Gợi ý hôm nay</h6>

                      {books != null &&
                        books.map((book) => {
                          return (
                            <div className="hint-product-area" key={book.id}>
                              <ProductCardRating
                                canAddToCartCard={true}
                                book={book}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
