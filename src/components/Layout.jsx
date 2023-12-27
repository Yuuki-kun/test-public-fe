import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer/Footer";

const Layout = ({ loggedIn }) => {
  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
