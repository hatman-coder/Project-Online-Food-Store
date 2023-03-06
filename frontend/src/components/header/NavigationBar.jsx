import React from "react";
import "./style/navbar.css";

const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Dominoz
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/cart">
              Cart
            </a>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
