import React from "react";
import "./style/style.css";
import { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom'

const Product = ({ productList, addOnsList }) => {
  const CheckboxArray = useRef([]);
  const navigate = useNavigate()
  const [buttonBgColor, setButtonBgColor] = useState("darkseagreen");
  const [cardOpacity, setCardOpacity] = useState(localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).some(item => item.id === productList.id) ? "85%" : "100%");


  useEffect(() => {
    // Check if the product is already in the cart
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log('cartItems', existingItems)
    if (existingItems.map(item => item.id) === productList.id) {
      setCardOpacity('85%')
      setButtonBgColor('darkseagreen')
    }
  }, [productList.id]);

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
        style={{ height: "200px", objectFit: "cover" }}
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
          {localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).some(item => item.id === productList.id) ?
            <button type="button" className="myButton" style={{backgroundColor: 'darkseagreen'}} onClick={() => navigate('/cart')}  >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="white" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              &nbsp;
              Cart
            </button>
            :
            <button
              className="myButton"
              style={{ backgroundColor: buttonBgColor }}
              onClick={() => {
                AddToCartHandle(productList);
                setCardOpacity("85%");
              }}
            >
              Add to Cart
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Product;
