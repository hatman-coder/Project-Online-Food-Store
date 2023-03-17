import axios from "axios";
import React, {useState} from "react";
import './style/signup.css'

const Signup = () => {
    const [error, setError] = useState('')

    const CreateAccount = () => {
        let email = document.getElementById('emailForm').value
        let password = document.getElementById('passwordForm').value
        let confirmPassword = document.getElementById('confirmPassword').value
        let name = document.getElementById('name').value
        let phone = document.getElementById('phone').value

        let postObject = {
            'email': email,
            'password': password,
            'name': name,
            'phone': phone
        }
       
        
        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return regex.test(email)
        }

        if (email.trim() === ''  || email === null 
        || password.trim() ==='' || password === null
        || confirmPassword.trim() ==='' || confirmPassword === null
        || name.trim() ==='' || name === null
        || phone.trim() ==='' || phone === null  
        ){
            setError('Please fillup all the required fields !')
        }

        else if(!validateEmail(email)){
            setError('Please enter a valid email address')
        }
        else if(password !== confirmPassword){
            setError('Password did not match !')
        }
        else{
            axios.post('http://127.0.0.1:8000/user/', postObject )
            .then(res => {
                if(res.data){
                    console.log(res.data)
                }
            })
            .catch(err => {
                if(err){
                    setError(err.res)
                }
            })

          
        }

    }

    return(
        <div className="body">
                <div className="signup-card-container">

                    <div className="signup-card">
                    <div className="signup-card-logo">
                            <img src="panda.png" alt="logo" />
                        </div>
                        <div className="signup-card-header">
                            <h1>Dominoz</h1>
                        </div>
                        <form className="signup-card-form">
                            <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">mail</span>
                                <input type="text" placeholder="Enter Email" id="emailForm"
                                    autoFocus required />
                            </div>
                            <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">password</span>
                                <input type="password" placeholder="Enter Password" id="passwordForm"
                                    required />
                            </div>
                             <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">password</span>
                                <input type="password" placeholder="Confirm Password" id="confirmPassword"
                                    required />
                            </div>
                            <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">person</span>
                                <input type="text" placeholder="Name" id="name"
                                    required />
                            </div>
                            <div className="form-item">
                                <span className="form-item-icon material-symbols-rounded">phone</span>
                                <input type="text" placeholder="Phone"
                                id="phone"
                                    required />
                            </div>
                           
                            {error && <p style={{ color: "#FF0800", textAlign: 'center', fontSize: '18px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>{error}</p>}
                            <button type="button" onClick={CreateAccount} >Create Account</button>
                        </form>
                        <div className="signup-card-footer">
                            Already have an account ? 
                            &nbsp;
                            <a href="/login">Login</a>
                        </div>
                    </div>
                    {/* <div className="signup-card-social">
                        <div>Other Sign-In Options</div>
                        <div className="signup-card-social-btns">
                            <a href="#">
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
                            <a href="#">
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
                    </div> */}
                </div>
            </div>
    )
}

export default Signup