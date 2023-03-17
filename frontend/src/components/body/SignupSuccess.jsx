import React from "react";
import './style/signup-success.css'

const SignupSuccess = ({ name }) => {

    return (
        <div>
            <div className="container container-custom">
            <p className="success-text">Hey {name} ! Your account creation is successful login now.</p>
            </div>
        </div>
        
    )
}

export default SignupSuccess