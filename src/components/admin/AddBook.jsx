import React, { useState } from "react";
import axios from "axios";
import { FcRemoveImage } from "react-icons/fc";
import {
  admin_headers_multipart,
  headers_multipart,
} from "../../axios_helper/axios_helper";
// function App() {

// }
// export default App;

const AddBook = () => {
  const [loading, setLoading] = useState(false);

  const fileInputRef = React.createRef();

  const [formData, setFormData] = useState({
    don_gia: 0,
    mo_ta: "",
    nxbname: "",
    categoryName: "",
    rating: 0,
    so_luong: 0,
    soluong_daban: 0,
    ten: "",
    ten_tac_gia: "",
    trang_thai: "Còn hàng",
  });
  const [file, setFile] = useState(null);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearAll = () => {
    setFile(null);
    fileInputRef.current.value = "";
    setFormData({
      don_gia: 0,
      mo_ta: "",
      nxbname: "",
      categoryName: "",
      rating: 0,
      so_luong: 0,
      soluong_daban: 0,
      ten: "",
      ten_tac_gia: "",
      trang_thai: "Còn hàng",
    });
  };

  const clearFile = () => {
    setFile(null);
    fileInputRef.current.value = "";
  };
  //old 1 file
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };
  //new - multi
  const handleFileChange = (e) => {
    // e.target.files là một FileList, chuyển đổi thành mảng để dễ xử lý
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);
  };
  console.log(file);
  const publisherOptions = [
    { value: "Kim Đồng", label: "Kim Đồng" },
    { value: "Văn Học", label: "Văn Học" },
    { value: "Trẻ", label: "Trẻ" },
    { value: "Phụ Nữ", label: "Phụ Nữ" },
    { value: "Nhà Văn", label: "Nhà Văn" },
    { value: "Thế Giói", label: "Thế Giói" },
    { value: "Thanh Niên", label: "Thanh Niên" },

    // Thêm các tùy chọn khác
  ];

  const categoryOptions = [
    { value: "Tiểu Thuyết", label: "Tiểu Thuyết" },
    { value: "Văn Học", label: "Văn Học" },
    { value: "Thiếu Nhi", label: "Thiếu Nhi" },
    { value: "Tâm Lý Học", label: "Tâm Lý Học" },
    { value: "Khoa Học", label: "Khoa Học" },
    // Thêm các tùy chọn khác
  ];

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const formDataToSubmit = new FormData();
    // for (const key in formData) {
    //   if (formData[key] !== null) {
    //     formDataToSubmit.append(key, formData[key]);
    //   }
    // }
    file.forEach((file, index) => {
      formDataToSubmit.append(`img`, file);
    });

    formDataToSubmit.append("formData", JSON.stringify(formData));

    axios
      .post(
        "https://short-sort-production.up.railway.app/admin-service/upload",
        formDataToSubmit,
        {
          headers: admin_headers_multipart,
        }
      )
      .then((response) => {
        console.log("File uploaded successfully", response.data);
        setLoading(false);
        window.location.href = "/admin/product-management";
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error uploading file", error);
      });
  };

  console.log(file);

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div class="container-body admin-add-product">
          <div className="row">
            <div className="col-12">
              <form
                onSubmit={handleSubmit}
                className="admin-add-product-form-control"
              >
                <div className="form-input">
                  <label htmlFor="img" className="d-block">
                    Image:
                  </label>
                  <input
                    type="file"
                    name="img"
                    id="img"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className={
                      file !== null ? "file-input file-w70" : "file-input"
                    }
                    required
                    multiple
                  />
                  {file && (
                    <button className="file-delete" onClick={clearFile}>
                      <FcRemoveImage className="clear-file-icon" />
                    </button>
                  )}
                </div>
                <div className="form-input">
                  <label htmlFor="don_gia">Price:</label>
                  <input
                    type="number"
                    name="don_gia"
                    id="don_gia"
                    value={formData.don_gia}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="mo_ta">Description:</label>

                  <textarea
                    name="mo_ta"
                    id="mo_ta"
                    value={formData.mo_ta}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="nxbname">Publisher Name:</label>
                  <select
                    name="nxbname"
                    id="nxbname"
                    value={formData.nxbname}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Publisher</option>
                    {publisherOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-input">
                  <label htmlFor="categoryName">Category Name:</label>
                  <select
                    name="categoryName"
                    id="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-input">
                  <label htmlFor="rating">Rating:</label>
                  <input
                    className="bg-secondary"
                    type="number"
                    name="rating"
                    id="rating"
                    value={formData.rating}
                    // onChange={handleInputChange}
                    disabled
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="so_luong">Quantity:</label>
                  <input
                    type="number"
                    name="so_luong"
                    id="so_luong"
                    value={formData.so_luong}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="soluong_daban">Sold Quantity:</label>
                  <input
                    type="number"
                    name="soluong_daban"
                    id="soluong_daban"
                    value={formData.soluong_daban}
                    onChange={handleInputChange}
                    disabled
                    className="bg-secondary"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="ten">Title:</label>
                  <input
                    type="text"
                    name="ten"
                    id="ten"
                    value={formData.ten}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="ten_tac_gia">Author Name:</label>
                  <input
                    type="text"
                    name="ten_tac_gia"
                    id="ten_tac_gia"
                    value={formData.ten_tac_gia}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="trang_thai">Status:</label>
                  <input
                    className="bg-secondary"
                    type="text"
                    name="trang_thai"
                    id="trang_thai"
                    value={formData.trang_thai}
                    // onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="add-prod-control-btn">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={clearAll}>
                    Clear All
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBook;
