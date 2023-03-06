import React from "react";
import "./style/style.css";
import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";

const Product = ({ productList, addOnsList }) => {
  const CheckboxArray = useRef([]);
  const [buttonBgColor, setButtonBgColor] = useState("darkseagreen");
  const [cardOpacity, setCardOpacity] = useState("100%");

  const CheckboxHandle = (e) => {
    if (!CheckboxArray.current.some((item) => item.id === e.id)) {
      CheckboxArray.current.push({
        id: e.id,
        add_ons: e.add_ons,
        add_ons_price: e.add_ons_price,
        quantity: 1,
      });
    } else {
      CheckboxArray.current.pop(e.id);
    }
  };

  const AddToCartHandle = (e) => {
    let existing = localStorage.getItem("cart");
    let existing_items;

    if (existing !== null) {
      existing_items = JSON.parse(existing);
    } else {
      existing_items = [];
    }
    if (!existing_items.some((item) => item.id === e.id)) {
      existing_items.push({
        id: e.id,
        img: e.img,
        name: e.name,
        price: e.price,
        in_stock: e.in_stock,
        category: e.category,
        add_ons: CheckboxArray.current,
        quantity: 1,
      });

      localStorage.setItem("cart", JSON.stringify(existing_items));
    } else {
      swal({
        title: "Oops",
        text: "Item is already in the cart !",
        icon: "error",
      });
    }

    CheckboxArray.current.splice(0, CheckboxArray.current.length);
    let get_checked_items = document.getElementsByClassName("form-check-input");
    for (let item of get_checked_items) {
      item.checked = false;
    }
  };

  return (
    <div
      className="card custom-card text-white mb-4"
      style={{ opacity: cardOpacity }}
    >
      <img
        className="card-img-top custom-card-img-top"
        src={productList.img}
        alt="Unavailable"
      />
      <div className="card-body transbox custom-card-body">
        <h5 className="card-title custom-cart-title">{productList.name}</h5>

        <p className="card-text custom-card-text">
          Price: ${productList.price}
        </p>
        <div className="customDiv">
          <div className="form-check form-check-inline">
            {/* eslint-disable-next-line */}
            {addOnsList.map((item, index) => {
              if (productList.category === item.category) {
                return (
                  <div key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onClick={() => CheckboxHandle(item)}
                    />
                    <label htmlFor="inlineCheckbox">{item.add_ons}</label>
                    <small className="ml-auto text-muted custom-class">
                      ${item.add_ons_price}
                    </small>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="card-footer custom-footer">
          <button
            className="myButton"
            style={{ backgroundColor: buttonBgColor }}
            onClick={() => {
              AddToCartHandle(productList);
              setButtonBgColor("gray");
              setCardOpacity("85%");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
