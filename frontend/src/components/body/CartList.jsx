import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import "./style/cartStyle.css";

const CartList = () => {
  const [cartData, setCartData] = useState([]);

  const loadCartData = () => {
    let data = localStorage.getItem("cart");
    if (data) {
      setCartData(JSON.parse(data));
    } else {
      console.log("No cart Data");
    }
  };
  const TotalPrice = () => {
    let productTotal = 0;
    let addOnsTotal = 0;
    let productsPrice = cartData.map(
      (item) => parseInt(item.price) * parseInt(item.quantity)
    );
    let addOnsPrice = cartData.map((item) =>
      item.add_ons.map(
        (item) => parseInt(item.add_ons_price) * parseInt(item.quantity)
      )
    );
    for (let i = 0; i < productsPrice.length; i++) {
      productTotal += productsPrice[i];
    }

    for (let j = 0; j < addOnsPrice.length; j++) {
      let insideArray = addOnsPrice[j];
      for (let x = 0; x < insideArray.length; x++) {
        addOnsTotal += insideArray[x];
      }
    }
    let total_price = parseInt(productTotal) + parseInt(addOnsTotal);
    return total_price;
  };

  useEffect(() => {
    loadCartData();
  }, []);

  return (
    <div className="cart-container">
      <div className="container">
        <div style={{ overflow: "hidden" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">AddOns</th>
                <th scope="col">Total</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map(
                (item) => {
                  return <Cart key={item.id} cartList={item} />;
                }
                // <Cart cartList={item} />
              )}
            </tbody>
          </table>
          <div className="custom-total">Total Price: ${TotalPrice()}</div>
        </div>
      </div>
    </div>
  );
};

export default CartList;