import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./test.css";

const MyComponent = () => {
  const ep = () => {
    const captureElement = document.querySelector("#capture");

    html2canvas(captureElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", [canvas.width, canvas.height]);

      // Sử dụng sự kiện onload để đảm bảo hình ảnh đã được tải hoàn toàn
      const img = new Image();
      img.onload = function () {
        pdf.addImage(this, 0, 0, canvas.width, canvas.height);
        pdf.save("download.pdf");
      };
      img.src = imgData;
    });
  };

  return (
    <div>
      <div id="capture">
        <p>
          Hello in my lifeHello in my lifeHello in my lifeHello in my lifeHello
          in my life
        </p>
        <span>How can hellp you</span>
      </div>
      <button onClick={ep}>Click</button>
    </div>
  );
};

export default MyComponent;
