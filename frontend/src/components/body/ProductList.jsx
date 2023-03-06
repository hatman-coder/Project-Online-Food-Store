import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/style.css";
import Product from "./Product";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [ProductError, setProductError] = useState([]);

  const [addOns, setAddons] = useState([]);
  const [addOnsError, setAddonsError] = useState([]);

  const loadProduct = () => {
    axios.get("http://127.0.0.1:8000/product/").then((res) => {
      if (res.data.error) {
        setProductError(res.data.error);
        console.log("Product-Error", ProductError);
      } else {
        setProduct(res.data);

        axios.get("http://127.0.0.1:8000/addOns/").then((res) => {
          if (res.data.error) {
            setAddonsError(res.data.error);
            console.log("AddOns-Error", addOnsError);
          } else {
            setAddons(res.data);
          }
        });
      }
    });
  };

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container divBody">
        <div className="row justify-content-md-center">
          {product.map((item, index) => {
            return (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12 align-self-center d-flex justify-content-center"
              >
                <Product productList={item} addOnsList={addOns} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
