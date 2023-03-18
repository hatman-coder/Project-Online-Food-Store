import React from "react";
import './style/signup-success.css'


const SignupSuccess = () => {

    const username = localStorage.getItem('username')
    if (username) {
        return (
            <div className=" container container-custom">
                <form className="login-card-form">
                            <div>
                                <h1>
                                    Success
                                </h1>
                            </div>
                            <div className="form-item">
                                <p>
                                    {username} your account has been created. <br></br>Press continue to login now.
                                </p>
                            </div>
                            <a  type="button" href="/login" style={{textDecoration: 'none'}} className="continue-button">Continue</a>
                        </form>

            </div>



        )
    }
    else {
        return (
            <div>
                <div className="container container-custom">
                    <p className="success-text">Unauthorized !</p>
                </div>
            </div>
        )
    }

}

export default SignupSuccess