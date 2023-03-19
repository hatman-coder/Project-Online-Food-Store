import React from "react";
import './style/checkout.css'

const Checkout = () => {

    return (
        <div className="container custom-checkout-container">
            <div className="in-container">
                <h2>Order Information</h2>
                <div className="row custom-row">
                    <label className="custom-label" htmlFor="orderid">Order ID</label>
                    <input className="checkout-input" type="text" name="orderid" />
                    
                </div>
                <div className="row custom-row">
                <label className="custom-label" htmlFor="lineone">Delivery destination</label>
                    <input className="checkout-input" type="text" name="addlineone" />
                    
                </div>
                <div className="row custom-row">
                    <div className="col2 custom-col2">
                    <label className="custom-label" htmlFor="city">City</label>
                        <input className="checkout-input" type="text" name="city" />
                        
                    </div>
                    <div className="col2 custom-col2">
                    <label className="custom-label" htmlFor="state">State/Region/Province</label>
                        <input className="checkout-input" type="text" name="state" />
                        
                    </div>
                </div>
                <div className="row custom-row">
                    <div className="col2 custom-col2">
                    <label className="custom-label" htmlFor="zipcode">Postal/Zip Code</label>
                        <input className="checkout-input" type="text" name="zipcode" />
                        
                    </div>
                    <div className="col2 custom-col2">
                    <label className="custom-label" htmlFor="country">Country</label>
                        <input className="checkout-input" type="text" name="country" />
                        
                    </div>
                </div>
                <div className="row custom-row">
                <label className="custom-label" htmlFor="date">When did you place your order?</label>
                    <input className="checkout-input" type="date" name="date" />
                    
                </div>
                <div className="row custom-div" style={{overflow: 'hidden'}}>
                    <button className="checkout-submit-button">Confirm order</button>
                </div>
            </div>
            </div>
            )
}


            export default Checkout