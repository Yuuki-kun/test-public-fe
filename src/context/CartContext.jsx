import { loadStripe } from "@stripe/stripe-js";
import { createContext, useState } from "react";
import { postProd, getUserData } from "../axios_helper/axios_helper";
import axios from "axios";

export const CartContext = createContext(null);

let stripePromise;
export const CartContextProvider = (props) => {
  // const getStripe = () => {
  //   if (!stripePromise) {
  //     stripePromise = loadStripe(
  //       "pk_test_51O25J9CB4m1aFTFZh7krdvvg6li3nl4OtSGSTLWR2DemaTQsTZv2uoBbgLqmfPtrl84Fa2S3kSizkQGCqULL0rsu00LXYB2KPl"
  //     );
  //     console.log(stripePromise);
  //   }
  //   return stripePromise;
  // };
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const checkoutHandler = async (
    paymentMethod,
    listOfSelectedProducts,
    addressForm
  ) => {
    if (paymentMethod === "card") {
      try {
        const responseURL = (await postProd(listOfSelectedProducts)).data;
        window.location.href = responseURL;
      } catch (err) {
        console.log(err);
      }
    } else if (paymentMethod === "cash") {
      const userData = getUserData();
      axios
        .post("/stripe/api/checkout-cash", {
          productPurchases: listOfSelectedProducts,
          customerEmail: JSON.parse(userData.user_info).email,
          address: addressForm.address,
          province: addressForm.province,
          city: addressForm.city,
          postalCode: addressForm.postalCode,
        })
        .then((res) => {
          window.location.href = "/payment/success";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const contextValues = {
    checkoutHandler,
  };
  return (
    <CartContext.Provider value={contextValues}>
      {props.children}
    </CartContext.Provider>
  );
};
