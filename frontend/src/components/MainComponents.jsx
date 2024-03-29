import React from "react";
import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartList from "./body/CartList";
import Login from "./body/Login";
import Signup from "./body/Signup";
import SignupSuccess from "./body/SignupSuccess";
import Checkout from "./body/Checkout";
import OrderSuccess from "./body/OrderSuccess";
import OrderMasterList from "./body/OrderMasterList";

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
  return (
    <div>
      <Header />
      <CartList />
      <Footer />
    </div>
  )
}

const LoginWrapper = () => {
  return (
    <div>
      <Header />
      <Login />
      <Footer />
    </div>
  )
}

const SignupWrapper = () => {
  return (
    <div>
      <Header />
      <Signup />
      <Footer />
    </div>
  )
}

const SignupSuccessWrapper = () => {
  return (
    <div>
      <Header />
      <SignupSuccess />
      <Footer />
    </div>
  )
}

const CheckoutWrapper = () => {
  return (
    <div>
      <Header />
      <Checkout />
      <Footer />
    </div>
  )
}

const OrderSuccessWrapper = () => {
  return (
    <div>
      <Header />
      <OrderSuccess />
      <Footer />
    </div>
  )
}

const OrderMasterListWrapper = () => {
  return (
    <div>
      <Header />
      <OrderMasterList />
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
    element: <CartListWrapper />
  },
  {
    path: '/login',
    element: <LoginWrapper />
  },
  {
    path: '/signup',
    element: <SignupWrapper />
  },
  {
    path: '/signup-success',
    element: <SignupSuccessWrapper />
  },
  {
    path: '/checkout',
    element: <CheckoutWrapper />
  },
  {
    path: '/orderSuccess',
    element: <OrderSuccessWrapper />
  },
  {
    path: '/orders',
    element: <OrderMasterListWrapper />
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
