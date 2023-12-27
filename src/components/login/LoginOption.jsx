import React from "react";
import LoggedIn from "./LoggedIn";
import NoneLoggedIn from "./NoneLoggedIn";

const LoginOption = ({ loggedIn, customerInfo }) => {
  console.log(loggedIn);
  return (
    <>
      {loggedIn ? <LoggedIn customerInfo={customerInfo} /> : <NoneLoggedIn />}
    </>
  );
};

export default LoginOption;
