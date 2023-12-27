import { createContext, useEffect, useState } from "react";
import {
  getAllBooks,
  getAllPriceId,
  getProductDetails,
  getUserRole,
} from "../axios_helper/axios_helper";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  //cart will contains the id of product

  //if cart is not in localStorage => add
  const cartItems = [];

  const localCart = localStorage.getItem("cart_items");
  if (localCart === null) {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    return cartItems;
  } else {
    // console.log(JSON.parse(localCart));
    // JSON.parse(localCart).map((item) => console.log(item.name));
    //return a list of object
    return JSON.parse(localCart);
  }
};

export const BookContextProvider = (props) => {
  const [isLogin, setLogin] = useState(false);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [books, setBooks] = useState([]);

  const user_login_info = JSON.parse(localStorage.getItem("user_data"));
  const admin_login_info = JSON.parse(localStorage.getItem("admin_data"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response.data);
        console.log(response.status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };

      if (itemId in updatedCartItems) {
        updatedCartItems[itemId].soluong += 1;
      } else {
        updatedCartItems[itemId] = { itemId, soluong: 1 };
      }

      return updatedCartItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (itemId in updatedCart) {
        if (updatedCart[itemId].soluong === 1) {
          delete updatedCart[itemId];
        } else {
          updatedCart[itemId] = {
            itemId,
            soluong: updatedCart[itemId].soluong - 1,
          };
        }
      }
      return updatedCart;
    });
  };

  const updateItemAmount = (itemId, amount) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (itemId in updatedCart) {
        updatedCart[itemId] = {
          itemId,
          soluong: amount,
        };
      }
      return updatedCart;
    });
  };

  const deleteItem = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (itemId in updatedCart) {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const getItemByID = (itemId) => {
    for (const book of books) {
      if (book.id === itemId) {
        return book;
      }
    }
    return null; // Trả về null nếu không tìm thấy đối tượng
  };

  const contextValues = {
    isLogin,
    setLogin,
    cartItems,
    addToCart,
    removeFromCart,
    updateItemAmount,
    deleteItem,
    books,
    getItemByID,
    user_login_info,
    admin_login_info,
  };
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <ShopContext.Provider value={contextValues}>
      {props.children}
    </ShopContext.Provider>
  );
};
