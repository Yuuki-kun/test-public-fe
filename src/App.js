import "./App.css";
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Cart from "./components/cart/Cart";
import { useContext, useEffect, useState } from "react";
import {
  BookContextProvider,
  UserContextProvider,
} from "./context/BookContext";
import { CartContextProvider } from "./context/CartContext";
import TrackingOrder from "./components/order/TrackingOrder";
import Profile from "./components/cus/Profile";
import CustomerInfoLayout from "./components/cus/CustomerInfoLayout";
import Orders from "./components/cus/Orders";
import Admin from "./components/admin/Admin";
import ProductView from "./components/view-product/ProductView";
import Unauthorize from "./components/Unauthorize";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOrderManagement from "./components/admin/AdminOrderManagement";
import AdminCategoryManagement from "./components/admin/AdminCategoryManagement";
import AdminProductManagement from "./components/admin/AdminProductManagement";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddBook from "./components/admin/AddBook";
import EditBook from "./components/admin/EditBook";
import OrderDetails from "./components/admin/OrderDetails";
import Invoice from "./components/admin/Invoice";
import MyPDFComponent from "./components/MyPDFComponent";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CheckoutSuccess from "./pages/CheckoutSuccess";
function App() {
  const user_login_info = JSON.parse(localStorage.getItem("user_data"));

  const [loggedIn, setLoggedIn] = useState(
    user_login_info === null ? false : user_login_info.logged_in
  );
  console.log(loggedIn);
  return (
    <BrowserRouter basename="/test-public-fe">
      <BookContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Layout loggedIn={loggedIn} />}>
              <Route index element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/cart" element={<Cart loggedIn={loggedIn} />} />
              <Route path="/productInfo/:id" element={<ProductView />} />
              <Route path="/unauthorize" element={<Unauthorize />} />
              <Route path="/search" element={<Search loggedIn={loggedIn} />} />
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route
                path="/payment/success"
                element={<CheckoutSuccess />}
              ></Route>

              {/* <Route path="/order-tracking" element={<TrackingOrder />} /> */}
              <Route path="/customer" element={<CustomerInfoLayout />}>
                <Route
                  path="profile/:id"
                  element={<Profile loggedIn={loggedIn} />}
                />
                <Route path="orders" element={<Orders />} />
                <Route path="order-tracking/:id" element={<TrackingOrder />} />
              </Route>
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login/admin" element={<Login />} />

              <Route path="admin-dashboard" element={<AdminDashboard />} />

              <Route
                path="order-management"
                element={<AdminOrderManagement />}
              />

              <Route
                path="order-management/order-details/:id"
                element={<OrderDetails />}
              />
              <Route
                path="category-management"
                element={<AdminCategoryManagement />}
              />
              <Route
                path="order-management/invoice/:id"
                element={<Invoice />}
              />

              <Route
                path="product-management"
                element={<AdminProductManagement />}
              />

              <Route path="product-management/add-book" element={<AddBook />} />
              <Route
                path="product-management/edit/:id"
                element={<EditBook />}
              />
            </Route>
          </Routes>
        </CartContextProvider>
      </BookContextProvider>
    </BrowserRouter>
  );
}
export default App;
