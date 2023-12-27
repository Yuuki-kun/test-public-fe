import React, { useContext, useEffect, useState } from "react";
import "./admin.css";
import { ShopContext } from "../../context/BookContext";
import { getUserRole } from "../../axios_helper/axios_helper";
import AdminOrderManagement from "./AdminOrderManagement";
import Login from "../login/Login";
const Admin = () => {
  return (
    <>
      <AdminOrderManagement />
    </>
  );
};

export default Admin;
