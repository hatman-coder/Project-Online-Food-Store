/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style/navbar.css";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'

const NavigationBar = () => {
  const navigate = useNavigate()


  const Logout = () => {
    localStorage.removeItem('jwt')
    Cookies.remove('auth')
    navigate('/login')
    
  }

  if (!localStorage.getItem('jwt') || !Cookies.get('auth')) {
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
  }
  else {
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
              <a className="nav-link" aria-current="page" href="/">
                Order
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page"  onClick={Logout}>
                Logout
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
  }

};

export default NavigationBar;
