import React from "react";
import './style/signup-success.css'


const OrderSuccess = () => {

    return (
        <div className=" container container-custom">
            <form className="login-card-form">
                        <div>
                            <h1>
                                Success
                            </h1>
                        </div>
                        <div className="form-item">
                            <h2 style={{color: 'white'}}>
                                Your requsted order has been submitted !
                            </h2>
                        </div>
                        <a  type="button" href="/orderDetail" style={{textDecoration: 'none', marginTop: '8rem'}} className="continue-button">Continue</a>
                    </form>

        </div>



    )
}

export default OrderSuccess