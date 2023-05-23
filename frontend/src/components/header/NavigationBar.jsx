/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style/navbar.css";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const NavigationBar = () => {
  const navigate = useNavigate()
  const cartItems = JSON.parse(localStorage.getItem('cart')) 
  const cartItemCount = cartItems ? cartItems.length : 0;



  const Logout = () => {
    let token = Cookies.get('auth')
    if (token) {
      axios.post('http://127.0.0.1:8000/logout', {}, {
      withCredentials: true,
      credentials: 'include'
        })
      .then(res => {
        if (res.data && res.data.message === 'success') { // check for 'success' message
          localStorage.removeItem('jwt')
          Cookies.remove('auth')
          navigate('/login')
        }
      }).catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          console.log(err.response.data.error)
        } else {
          console.log(err)
        }
      })
    }
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
                Cart <span className="badge badge-light" style={{backgroundColor: 'blue', position: 'absolute', top: '8px', right: '15px'}}>{cartItemCount}</span>
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
              <a className="nav-link" aria-current="page" href="/orders">
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page"  onClick={Logout}>
                Logout
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/cart">
                Cart <span className="badge badge-light" style={{backgroundColor: 'blue', position: 'absolute', top: '8px', right: '15px'}}>{cartItemCount}</span>
              </a>
            </li>
          </div>
        </nav>
      </div>
    );
  }

};

export default NavigationBar;
