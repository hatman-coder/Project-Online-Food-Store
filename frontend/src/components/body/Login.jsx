import React, { useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import "./style/login.css"
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()

    

    const Signin = () => {
        let email = document.getElementById('emailForm').value
        let password = document.getElementById('passwordForm').value

        let postObject = {
            'email': email,
            'password': password
        }

        const emailValue = document.getElementById('emailForm').value;
        const passwordValue = document.getElementById('passwordForm').value

        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return regex.test(email)
        }


        if (emailValue.trim() === '' || emailValue === null) {
            setError('Fill the email field first !')
        }

        else if (!validateEmail(emailValue)) {
            setError('Please enter a valid email address')
        }

        else if (passwordValue.trim() === '' || passwordValue === null) {
            setError('Password field can not be empty!')
        }

        else {
            axios.post("http://127.0.0.1:8000/login", postObject)
                .then(res => {
                    if (res.data.jwt && res.data.status !== 400) {
                        Cookies.set('auth', res.data.jwt)
                        localStorage.setItem('jwt', res.data.jwt)
                        localStorage.removeItem('username')
                        window.location.reload()
                        navigate('/')
                        

                    }
                    else {
                        console.log('No response found')
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.data.detail)
                            setError(err.response.data.detail)
                        console.log(err)
                    }
                    else if (err) {
                        console.log(err)
                    }
                }
                )
        }


    }



    if (!localStorage.getItem('jwt') && !Cookies.get('auth')) {
        return (
            <div className="body">
                <div className="login-card-container">
                    <div className="login-card">
                        <div className="login-card-logo">
                            <img src="panda.png" alt="logo" />
                        </div>
                        <div className="login-card-header">
                            <h1>Dominoz</h1>
                            <div>Please login to use the platform</div>
                        </div>
                        <form className="login-card-form">
                            <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">mail</span>
                                <input type="text" autoComplete="email" placeholder="Enter Email" id="emailForm"
                                    autoFocus required />
                            </div>
                            <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">lock</span>
                                <input type="password" autoComplete="current-password" placeholder="Enter Password" id="passwordForm"
                                    required />
                            </div>
                            <div className="form-item-other">
                                <div className="checkbox">
                                    <input type="checkbox" id="rememberMeCheckbox" />
                                    <label htmlFor="rememberMeCheckbox">Remember me</label>
                                </div>
                                <a href="/login">I forgot my password!</a>
                            </div>
                            {error && <p style={{ color: "#FF0800", textAlign: 'center', fontSize: '18px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>{error}</p>}
                            <button type="button" onClick={Signin}>Sign In</button>
                        </form>
                        <div className="login-card-footer">
                            Don't have an account ? &nbsp; <a href="/signup">Create a free account.</a>
                        </div>
                    </div>
                    <div className="login-card-social">
                        <div>Other Sign-In Options</div>
                        <div className="login-card-social-btns">
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-brand-facebook"
                                    width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                </svg>
                            </a>
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-brand-google" width="24"
                                    height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        )
    } 
    else {
    
        return (
            <>
                <ProductList />
            </>
        )
    }
}




export default Login
