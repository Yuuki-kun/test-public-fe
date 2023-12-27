import React, { useEffect, useState } from "react";
import {
  admin_headers,
  admin_headers_multipart,
  headers,
} from "../../axios_helper/axios_helper";
import axios from "axios";

const AdminCategoryManagement = () => {
  const [loading, setLoading] = useState(true);

  const [cate, setCate] = useState([]);
  const [publishing, setPublishing] = useState([]);
  useEffect(() => {
    axios
      .get("/admin-service/cate-publi-alls", {
        headers: admin_headers,
      })
      .then((res) => {
        setCate(res.data.bookCategories);
        setPublishing(res.data.publishings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const [addNXB, setAddNxb] = useState(false);
  const [addCate, setAddCate] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setFile(selectedFiles);
  };
  const [pubFormData, setPubFormData] = useState({
    ten: "",
    email: "",
    dia_chi: "",
  });
  const handleInputChange = (e) => {
    setPubFormData({ ...pubFormData, [e.target.name]: e.target.value });
  };
  console.log(cate);
  console.log(publishing);
  console.log(pubFormData);
  console.log(file);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("img", file);
    formDataToSubmit.append("pubFormData", JSON.stringify(pubFormData));

    axios
      .post(
        "https://short-sort-production.up.railway.app/admin-service/add-publisher",
        formDataToSubmit,
        {
          headers: admin_headers_multipart,
        }
      )
      .then((response) => {
        console.log("File uploaded successfully", response.data);
        if (response.data) {
          alert("Thêm thành công.");
        } else {
          alert("Lỗi, không thể thêm.");
        }
        setLoading(false);
        window.location.href = "/admin/category-management";
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        setLoading(false);
      });
  };

  const [cateName, setCateName] = useState("");

  const handleInputChangeCate = (e) => {
    setCateName(e.target.value);
  };

  console.log(cateName);
  const handleSubmitCate = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`/admin-service/add-cate?name=${cateName}`, null, {
        headers: admin_headers,
      })
      .then((res) => {
        if (res.data) {
          alert("Thêm thành công.");
        } else {
          alert("Thêm thất bại.");
        }
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div class="container-main-page col-11 p-0">
          <div class="contaienr-title contaienr-title-category ms-lg-0 ms-5 me-3 gap-md-0 gap-4">
            <div class="px-3">Danh Sách Danh Mục</div>
            <div id="time-display"></div>
          </div>
          <div class="bg-light me-3 rounded-3 p-4 ms-lg-1 ms-5">
            <div class="container-head-category d-flex flex-md-row flex-column-reverse gap-md-0 gap-3 justify-content-between align-items-center">
              {/* <!-- Hiển thị form thêm danh mục khi click vào button thêm danh mục --> */}

              <div class="container-form-category">
                <div class="form-add-category px-3 py-4">
                  <form action="#">
                    <div class="mb-1">
                      <label for="category-name" class="form-label">
                        Tên Danh Mục:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="category-name"
                        name="category-name"
                      />
                    </div>

                    <div class="mb-1">
                      <label for="description" class="form-label">
                        Mô Tả Danh Mục:
                      </label>
                      <textarea
                        class="form-control"
                        id="description"
                        name="description"
                      ></textarea>
                    </div>

                    <div class="d-flex gap-2 justify-content-end gap-lg-4 mt-4">
                      <button
                        type="button"
                        class="cancelButtonCatefory btn btn-secondary px-lg-3 px-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="saveButtonCategory btn btn-primary px-lg-4 px-3"
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* <!-- ********************************************************************************************** --> */}

              <div class="dropdown">
                <span>Hiện </span>
                <button
                  class="btn btn-secondary dropdown-toggle bg-light text-black"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  10
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li>
                    <button class="dropdown-item active" type="button">
                      10
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      25
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      50
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      100
                    </button>
                  </li>
                </ul>
                <span> Danh mục</span>
              </div>

              <div>
                <form>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm kiếm..."
                    />
                    <button class="btn btn-primary" type="button">
                      Tìm
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <button className="add-nxb-btn" onClick={() => setAddNxb(!addNXB)}>
              Thêm nhà xuất bản
            </button>
            {addNXB && (
              <form onSubmit={handleSubmit}>
                <div className="input-group-add-nxb">
                  <label htmlFor="img_nxb">Logo</label>
                  <input
                    id="img_nxb"
                    name="img_nxb"
                    type="file"
                    class="form-control"
                    onChange={handleFileChange}
                    required
                  />
                  <label htmlFor="ten">Tên</label>
                  <input
                    id="ten"
                    name="ten"
                    type="text"
                    class="form-control"
                    placeholder="Tên nhà xuất bản"
                    value={pubFormData.ten}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    value={pubFormData.email}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="dia_chi">Địa chỉ</label>
                  <input
                    id="dia_chi"
                    name="dia_chi"
                    type="text"
                    class="form-control"
                    placeholder="Địa chỉ"
                    value={pubFormData.dia_chi}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="add-nxb-submit" type="submit">
                  Submit
                </button>
              </form>
            )}
            <div class="table-infor-category mt-3">
              <table>
                <thead class="title-table-category">
                  <tr>
                    <th>ID</th>
                    <th>Mô tả</th>
                    <th>Tên Nhà Xuất Bản</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Chức Năng</th>
                  </tr>
                </thead>
                <tbody class="data-table-category">
                  {publishing &&
                    publishing.map((publi) => {
                      return (
                        <tr>
                          <td>{publi.nbx_id}</td>
                          <td>
                            <img
                              className="img-fluid"
                              src={publi.nxb_img}
                              alt=""
                            />
                          </td>
                          <td>{publi.nxb}</td>
                          <td>{publi.nbx_email}</td>
                          <td>{publi.nxb_dia_chi}</td>

                          <td>
                            <i class="fa-regular fa-pen-to-square"></i>{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <button
              className="add-nxb-btn"
              onClick={() => setAddCate(!addCate)}
            >
              Thêm danh mục
            </button>
            <div class="table-infor-category mt-3">
              {addCate && (
                <form onSubmit={handleSubmitCate}>
                  <div className="input-group-add-nxb">
                    <label htmlFor="ten">Tên danh mục</label>
                    <input
                      id="cateName"
                      name="cateName"
                      type="text"
                      class="form-control"
                      placeholder="Tên danh mục"
                      value={cateName}
                      onChange={handleInputChangeCate}
                    />
                  </div>
                  <button className="add-nxb-submit" type="submit">
                    Submit
                  </button>
                </form>
              )}
              <table>
                <thead class="title-table-category">
                  <tr>
                    <th>ID Danh Mục</th>
                    <th>Tên Danh Mục</th>
                    <th>Chức Năng</th>
                  </tr>
                </thead>
                <tbody class="data-table-category">
                  {cate !== null &&
                    cate.map((cat) => {
                      return (
                        <tr>
                          <td>{cat.tl_id}</td>
                          <td>{cat.tl}</td>
                          <td>
                            <i class="fa-regular fa-pen-to-square"></i>
                          </td>
                        </tr>
                      );
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

export default AdminCategoryManagement;
