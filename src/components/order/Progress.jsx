import React from "react";

const Progress = ({ tracking, isCurrently, datetime }) => {
  console.log(datetime);
  return (
    <div className="order-tracking">
      <div className="progress-order">
        <span
          className={
            isCurrently ? "tracking-milestone current" : "tracking-milestone"
          }
        ></span>
        <span className="tracking-line"></span>
      </div>
      <div
        className={
          isCurrently
            ? "order-tracking-content current"
            : "order-tracking-content"
        }
      >
        <p>{tracking}</p>
        <p>Thời gian: {new Date(datetime).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Progress;
