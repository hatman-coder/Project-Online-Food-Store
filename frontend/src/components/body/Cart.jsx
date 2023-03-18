import React, { useEffect, useState } from "react";
import "./style/cartStyle.css";

const Cart = ({ cartList }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let cart_data = JSON.parse(localStorage.getItem("cart"));
    if (cart_data) {
      setCartData(cart_data);
    }
  }, []);

  const MinusHandle = (cartId) => {
    const new_dataset = cartData.map((item) =>
      item.id === cartId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartData(new_dataset);
    localStorage.setItem("cart", JSON.stringify(new_dataset));
    window.location.reload();
  };

  const MinusHandleAddOns = (cartListId, addOnsId) => {
    const new_dataset = cartData.map((item) => {
      if (item.id === cartListId) {
        let new_addOns_dataset = item.add_ons.map((item) =>
          item.id === addOnsId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return {
          ...item,
          add_ons: new_addOns_dataset,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setCartData(new_dataset);
    localStorage.setItem("cart", JSON.stringify(new_dataset));
    window.location.reload();
  };

  const PlusHandleAddOns = (cartListId, addOnsId) => {
    const new_dataset = cartData.map((item) => {
      if (item.id === cartListId) {
        let new_addOns_dataset = item.add_ons.map((item) =>
          item.id === addOnsId ? { ...item, quantity: item.quantity + 1 } : item
        );
        return {
          ...item,
          add_ons: new_addOns_dataset,
        };
      } else {
        return item;
      }
    });
    setCartData(new_dataset);
    localStorage.setItem("cart", JSON.stringify(new_dataset));
    window.location.reload();
  };

  const PlusHandle = (cartId) => {
    const new_dataset = cartData.map((item) =>
      item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartData(new_dataset);
    localStorage.setItem("cart", JSON.stringify(new_dataset));
    window.location.reload();
  };

  const Total = (cartListId) => {
    let addOns_price = 0;
    // eslint-disable-next-line
    cartData.map((item) => {
      if (item.id === cartListId) {
        let addOns_list = item.add_ons.map((item) => {
          return parseInt(item.add_ons_price) * parseInt(item.quantity);
        });

        for (let i = 0; i < addOns_list.length; i++) {
          addOns_price += addOns_list[i];
        }
      }
    });

    return addOns_price;
  };

  const DeleteHandle = (e) => {
    const items = JSON.parse(localStorage.getItem("cart"));
    const filtered = items.filter((item) => item.id !== e);
    localStorage.setItem("cart", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <tr>
      <td>
        <img
          src={cartList.img}
          alt="unavailable"
          style={{ width: "150px", height: "100px" }}
        />
      </td>
      <td>{cartList.name}</td>
      <td>{cartList.price}</td>
      <td>
        <button
          className="cart-button-minus"
          onClick={() => MinusHandle(cartList.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            fill="currentColor"
            className="bi bi-dash"
            viewBox="0 0 16 16"
          >
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </button>
        &nbsp;
        {cartList.quantity}
        &nbsp;
        <button
          className="cart-button-plus"
          onClick={() => PlusHandle(cartList.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </td>
      <td>
        {cartList.add_ons.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col">
                  {item.add_ons}: (${item.add_ons_price})
                </div>
                <div className="col">
                  <button
                    className="cart-button-minus"
                    onClick={() => MinusHandleAddOns(cartList.id, item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="16"
                      fill="currentColor"
                      className="bi bi-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                  </button>
                  &nbsp;
                  {item.quantity}
                  &nbsp;
                  <button
                    className="cart-button-plus"
                    onClick={() => PlusHandleAddOns(cartList.id, item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </td>
      <td>
        {parseInt(cartList.price) * parseInt(cartList.quantity) +
          Total(cartList.id)}
      </td>
      <td>
        <button
          className="delete-button"
          onClick={() => DeleteHandle(cartList.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="28"
            fill="currentcolor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cart;
