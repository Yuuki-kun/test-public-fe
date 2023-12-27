import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/BookContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { admin_headers, headers } from "../../axios_helper/axios_helper";
import Login from "../login/Login";

const AdminProductManagement = () => {
  const { books } = useContext(ShopContext);
  const [numberProduct, setNumberProduct] = useState(10);
  const [booksSee, setBooksSee] = useState([]);
  const [searchV, setSearchV] = useState("");

  const [loading, setLoading] = useState(true);

  const numberProductHandler = (val) => {
    setNumberProduct(val);
    // if (books.length >= 2) {
    //   let temp = books[0];
    //   books[0] = books[books.length - 1];
    //   books[books.length - 1] = temp;
    // }
  };

  console.log("b=" + books);

  useEffect(() => {
    setBooksSee(books.slice(0, numberProduct));
    setLoading(false);
  }, [books, numberProduct]);

  const editBook = (id) => {
    window.location.href = window.location.pathname + `/edit/${id}`;
  };

  const deleteBook = (id) => {
    setLoading(true);
    axios
      .delete(`/admin-service?id=${id}`, {
        headers: admin_headers,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "failed") {
          alert(
            "Không thể xóa, sách này có liên quan đến một đơn hàng nào đó."
          );
        } else {
          alert(res.data);
        }
        setLoading(false);
        window.location.href = "/admin/product-management";
      })
      .catch((err) => {
        console.log("err=" + err);
        // window.location.href = "/admin/login/admin";
        window.location.href = "/admin/product-management";
      });
  };

  console.log(loading);

  const search = (searchV) => {
    setLoading(true);
    console.log(searchV);
    axios
      .get(`/api/v1/home/search-book?searchTerm=${searchV}`)
      .then((res) => {
        setBooksSee(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (books.length >= 2) {
    let temp = books[0];
    books[0] = books[books.length - 1];
    books[books.length - 1] = temp;
  }
  const closeSearch = () => {
    setBooksSee(books.slice(0, numberProduct));
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div class="container-main-page col-11 p-0">
          <div class="contaienr-title contaienr-title-product ms-lg-0 ms-5 me-3 gap-md-0 gap-4">
            <div class="px-3">Danh Sách Sản Phẩm</div>
            <div id="time-display"></div>
          </div>
          <div class="bg-light me-3 rounded-3 p-4 ms-lg-1 ms-5">
            <div class="container-head-product d-flex flex-md-row flex-column-reverse gap-md-0 gap-3 justify-content-between align-items-center">
              <div className="search-product">
                <form>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm kiếm..."
                      value={searchV}
                      onChange={(e) => setSearchV(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => search(searchV)}
                    >
                      Tìm
                    </button>
                    <button
                      className="close-search"
                      onClick={() => closeSearch()}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>

              <Link class="addProduct-product" to={"add-book"}>
                Thêm Sách
              </Link>
            </div>
            <p>Tổng: {books.length} sách</p>
            <div class="dropdown d-inline">
              <span>Hiện </span>
              <button
                class="btn btn-secondary dropdown-toggle bg-light text-black"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {numberProduct}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button
                    class="dropdown-item active"
                    type="button"
                    onClick={(e) => numberProductHandler(10)}
                  >
                    10
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={(e) => numberProductHandler(25)}
                  >
                    25
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={(e) => numberProductHandler(50)}
                  >
                    50
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={(e) => numberProductHandler(100)}
                  >
                    100
                  </button>
                </li>
              </ul>
              <span> Danh mục</span>
            </div>

            <div class="table-infor-product mt-3">
              <table>
                <thead>
                  <tr class="title-table-product">
                    <th>ID Sách</th>
                    <th>Tên Sách</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Trạng Thái</th>
                    <th>Đơn Giá</th>
                    <th>Thể Loại</th>
                    <th>Chức Năng</th>
                  </tr>
                </thead>
                <tbody class="data-table-product">
                  {booksSee.map((book, index) => {
                    if (index < numberProduct) {
                      return (
                        <tr>
                          <td>{book.id}</td>
                          <td>{book.ten}</td>
                          <td>
                            <img src={book.img} alt="" />
                          </td>
                          <td>{book.so_luong}</td>
                          <td>
                            <span>{book.trang_thai}</span>
                          </td>
                          <td>{book.don_gia * 1000}đ</td>
                          <td>{book.theloai}</td>
                          <td>
                            <i
                              class="fa-regular fa-pen-to-square"
                              onClick={(e) => editBook(book.id)}
                            ></i>
                            <i
                              class="fa-solid fa-trash-can"
                              onClick={(e) => deleteBook(book.id)}
                            ></i>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductManagement;
