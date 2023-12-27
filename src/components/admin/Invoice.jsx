import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./admin.css";
import { useParams } from "react-router-dom";
import { getOrderInfo } from "../../axios_helper/axios_helper";
import { GiCheckMark } from "react-icons/gi";

const Invoice = () => {
  const { id } = useParams();

  const [orderDetails, setOrderDetails] = useState({});
  useEffect(() => {
    getOrderInfo(id)
      .then((order) => {
        setOrderDetails(order);
      })
      .catch((e) => {
        console.log(e);
        setOrderDetails({});
      });
  }, [id]);

  console.log(orderDetails);

  // const downloadInvoice = () => {
  //   html2canvas(document.getElementById("invoice-to-download"))
  //     .then((canvas) => {
  //       document.getElementById("invoice-to-download").style.overflow = "auto";
  //       var imgData = canvas.toDataURL("image/png");
  //       var doc = new jsPDF("l", "mm");
  //       doc.addImage(imgData, "PNG", 10, 10);
  //       doc.save("invoice.pdf");
  //       console.log("down?");
  //     })
  //     .catch((error) => {
  //       console.error("Error during html2canvas operation:", error);
  //     });
  // };

  const downloadInvoice = () => {
    const content = document.getElementById("invoice-to-download");
    const width = content.offsetWidth;
    const height = content.offsetHeight;
    html2canvas(content, {
      scale: 1.5,
      // preserveDrawingBuffer: true,
    })
      .then((canvas) => {
        var imgData = canvas.toDataURL("image/jpeg", 2);
        var doc = new jsPDF("l", "px", [width, height]);
        doc.addImage(imgData, "JPEG", 60, 60);
        doc.save("invoice.pdf");
        console.log("down?");
      })
      .catch((error) => {
        console.error("Error during html2canvas operation:", error);
      });
  };
  let totalProduct = 0;

  //convert number to text
  const defaultNumbers = " hai ba bốn năm sáu bảy tám chín";

  const chuHangDonVi = ("1 một" + defaultNumbers).split(" ");
  const chuHangChuc = ("lẻ mười" + defaultNumbers).split(" ");
  const chuHangTram = ("không một" + defaultNumbers).split(" ");

  function convert_block_three(number) {
    if (number == "000") return "";
    var _a = number + ""; //Convert biến 'number' thành kiểu string

    //Kiểm tra độ dài của khối
    switch (_a.length) {
      case 0:
        return "";
      case 1:
        return chuHangDonVi[_a];
      case 2:
        return convert_block_two(_a);
      case 3:
        var chuc_dv = "";
        if (_a.slice(1, 3) != "00") {
          chuc_dv = convert_block_two(_a.slice(1, 3));
        }
        var tram = chuHangTram[_a[0]] + " trăm";
        return tram + " " + chuc_dv;
    }
  }

  function convert_block_two(number) {
    var dv = chuHangDonVi[number[1]];
    var chuc = chuHangChuc[number[0]];
    var append = "";

    // Nếu chữ số hàng đơn vị là 5
    if (number[0] > 0 && number[1] == 5) {
      dv = "lăm";
    }

    // Nếu số hàng chục lớn hơn 1
    if (number[0] > 1) {
      append = " mươi";

      if (number[1] == 1) {
        dv = " mốt";
      }
    }

    return chuc + "" + append + " " + dv;
  }
  const dvBlock = "1 nghìn triệu tỷ".split(" ");

  function to_vietnamese(number) {
    var str = parseInt(number) + "";
    var i = 0;
    var arr = [];
    var index = str.length;
    var result = [];
    var rsString = "";

    if (index == 0 || str == "NaN") {
      return "";
    }

    // Chia chuỗi số thành một mảng từng khối có 3 chữ số
    while (index >= 0) {
      arr.push(str.substring(index, Math.max(index - 3, 0)));
      index -= 3;
    }

    // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != "" && arr[i] != "000") {
        result.push(convert_block_three(arr[i]));

        // Thêm đuôi của mỗi khối
        if (dvBlock[i]) {
          result.push(dvBlock[i]);
        }
      }
    }

    // Join mảng kết quả lại thành chuỗi string
    rsString = result.join(" ");
    rsString += "đồng";

    return rsString.replace(/[0-9]/g, "").replace(/ /g, " ").replace(/ $/, "");
  }

  return (
    <>
      <div className="container-main-page col-11">
        <div className="d-flex align-items-start justify-content-center">
          <button className="download-invoice-btn" onClick={downloadInvoice}>
            Tải xuống hóa đơn PDF
          </button>
          {orderDetails && orderDetails.customerDto && (
            <div className="invoice-container" id="invoice-to-download">
              <div className="row">
                <div className="col-12 invoice-top-info">
                  <h3>Hóa đơn</h3>
                  <h3>Tống Công Minh</h3>
                </div>
                <div className="col-12">
                  <p className="invoice-number">
                    Số hóa đơn: {orderDetails.id}
                  </p>
                  <p>
                    {new Date(
                      orderDetails.paymentAddressDto.dcghNgayGiao
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="col-5 company-info">
                  <h5>Tống Công Minh</h5>
                  <p>Cần Thơ, Việt Nam</p>
                  <p>(+84)0707070707</p>
                </div>
                <div className="col-3 to-cus-info">
                  <h5>Gửi hóa đơn tới</h5>
                  <p>{orderDetails.customerDto.name}</p>
                  <p>{orderDetails.customerDto.phoneNumber}</p>
                  <p>email:</p>
                </div>
                <div className="col-4 shipping-info">
                  <h5>Vận chuyển đến</h5>
                  <p>{orderDetails.customerDto.name}</p>
                  <p>{orderDetails.paymentAddressDto.dcghDiaChi}</p>
                  <p>{orderDetails.paymentAddressDto.dcghThanhPho}</p>
                  <p>
                    {orderDetails.paymentAddressDto.dcghTinh}{" "}
                    {orderDetails.paymentAddressDto.postalCode}
                  </p>
                  <p> {orderDetails.paymentAddressDto.dcghQuocGia}</p>
                </div>
                <div className="col-12">
                  <h5>
                    Đã thanh toán{" "}
                    {orderDetails.paymentDto.totalAmount.toLocaleString()}₫ vào
                    ngày{" "}
                    {new Date(
                      orderDetails.paymentAddressDto.dcghNgayGiao
                    ).getUTCDate()}{" "}
                    tháng{" "}
                    {new Date(
                      orderDetails.paymentAddressDto.dcghNgayGiao
                    ).getUTCMonth()}
                    ,{" "}
                    {new Date(
                      orderDetails.paymentAddressDto.dcghNgayGiao
                    ).getUTCFullYear()}
                  </h5>
                  <p>
                    Hình thức thanh toán:{" "}
                    <b>{orderDetails.paymentDto.paymentMethod}</b>
                  </p>
                </div>
                <div className="col-12 invoice-product">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Số tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.items.map((item, idx) => {
                        totalProduct += item.qty;
                        return (
                          <tr>
                            <th scope="row">{idx + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.price.toLocaleString()}đ</td>
                            <td>{(item.price * item.qty).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th scope="row" colSpan={2}>
                          Tổng Cộng
                        </th>
                        <td>{totalProduct}</td>
                        <td>{orderDetails.paymentDto.totalAmount}đ</td>
                        <td>{orderDetails.paymentDto.totalAmount}đ</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan={4}>
                          Phí vận chuyển
                        </th>
                        <td>0đ</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan={4}>
                          Thuế
                        </th>
                        <td>0đ</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan={4}>
                          Giảm giá
                        </th>
                        <td>0đ</td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan={4}>
                          Thành tiền
                        </th>
                        <td>
                          <b>{orderDetails.paymentDto.totalAmount}đ</b>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan={1}>
                          Số tiền viết bằng chữ
                        </th>
                        <td colSpan={4}>
                          <b>
                            {to_vietnamese(orderDetails.paymentDto.totalAmount)}
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="invoice-footer">
                  <div className="invoice-customer">
                    <h5>Người mua hàng</h5>
                    <p>(Chữ ký điện tử, chữ ký số)</p>
                  </div>
                  <div className="invoice-saler">
                    <h5>Người bán hàng</h5>
                    <p>(Chữ ký điện tử, chữ ký số)</p>
                    <div className="signature-valid">
                      <GiCheckMark className="valid-icon" />
                      <p>Signature Valid</p>
                      <div className="company-name">
                        <p>CÔNG TY TNHH HAI THÀNH VIÊN</p>
                        <p>FUTUREBOUND BOOKS</p>
                      </div>
                      <p>
                        <span>Ngày ký: </span>
                        {new Date(
                          orderDetails.paymentAddressDto.dcghNgayGiao
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Invoice;
