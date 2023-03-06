import React from "react";
import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartList from "./body/CartList";
import Login from "./body/Login";

const ProductWrapper = () => {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

const CartListWrapper = () => {
  return(
    <div>
    <Header />
    <CartList/>
    <Footer />
  </div>
  )
}

const LoginWrapper = () => {
  return(
    <div>
      <Header />
      <Login/>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductWrapper />,
  },
  {
    path: '/cart',
    element: <CartListWrapper/>
  },
  {
    path: '/login',
    element: <LoginWrapper/>
  }
]);

const MainComponents = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default MainComponents;
