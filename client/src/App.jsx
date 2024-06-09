import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Ft from "./components/Ft";
import Auth from "./components/Auth";
import Detail from "./pages/Detail";
import { Toaster } from "react-hot-toast";
import PreventUser from "./pages/PreventUser";
import Dashboard from "./pages/Dashboard";
import { useLocation } from "react-router-dom";
import EditProduct from "./pages/EditProduct";
import ScrollToTop from "./components/ScrollToTop";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOut from "./pages/CheckOut";
import Success from "./pages/Success";
import AllProducts from "./pages/AllProducts";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Wishlist from "./pages/Wishlist";
const App = () => {
  const location = useLocation();

  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    if (showAuth) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAuth]);
  return (
    <>
      {location.pathname !== "/dashboard" && <Nav setShowAuth={setShowAuth} />}
      <ScrollToTop />
      <Routes>
      
        <Route path="/" element={<Home  setShowAuth={setShowAuth}/>} />
        <Route path="/shop/:slug" element={<Detail setShowAuth={setShowAuth}/>} />
        <Route path="/shops"  element={<AllProducts setShowAuth={setShowAuth} />} />
        <Route element={<PreventUser />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/shoppingCart" element={<ShoppingCart />}/>
        <Route path="/shipping" element={<CheckOut />}/>
        <Route path="/success" element={<Success />}/>
        <Route path="/wishlists" element={<Wishlist />}/>
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
      </Routes>
      {showAuth && <Auth setShowAuth={setShowAuth} />}
      <Toaster />
      {location.pathname !== "/dashboard" && <Ft />}
    </>
  );
};

export default App;
