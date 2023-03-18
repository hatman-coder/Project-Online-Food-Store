import React from "react";
// import './style/checkout.css'

const Checkout = () => {

    return (
        <div>
            <div classname="row">
                <div classname="col-75">
                    <div classname="container">
                        <form action="/action_page.php">

                            <div classname="row">
                                <div classname="col-50">
                                    <h3>Billing Address</h3>
                                    <label for="fname"><i classname="fa fa-user"></i> Full Name</label>
                                    <input type="text" id="fname" name="firstname" placeholder="John M. Doe"/>
                                        <label for="email"><i classname="fa fa-envelope"></i> Email</label>
                                        <input type="text" id="email" name="email" placeholder="john@example.com"/>
                                            <label for="adr"><i classname="fa fa-address-card-o"></i> Address</label>
                                            <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
                                                <label for="city"><i classname="fa fa-institution"></i> City</label>
                                                <input type="text" id="city" name="city" placeholder="New York"/>

                                                    <div classname="row">
                                                        <div classname="col-50">
                                                            <label for="state">State</label>
                                                            <input type="text" id="state" name="state" placeholder="NY"/>
                                                        </div>
                                                        <div classname="col-50">
                                                            <label for="zip">Zip</label>
                                                            <input type="text" id="zip" name="zip" placeholder="10001"/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div classname="col-50">
                                                    <h3>Payment</h3>
                                                    <label for="fname">Accepted Cards</label>
                                                    <div classname="icon-container">
                                                        <i classname="fa fa-cc-visa" style={{color:"navy"}}></i>
                                                        <i classname="fa fa-cc-amex" style={{color:"blue"}}></i>
                                                        <i classname="fa fa-cc-mastercard" style={{color:"red"}}></i>
                                                        <i classname="fa fa-cc-discover" style={{color:"orange"}}></i>
                                                    </div>
                                                    <label for="cname">Name on Card</label>
                                                    <input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
                                                        <label for="ccnum">Credit card number</label>
                                                        <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
                                                            <label for="expmonth">Exp Month</label>
                                                            <input type="text" id="expmonth" name="expmonth" placeholder="September"/>

                                                                <div classname="row">
                                                                    <div classname="col-50">
                                                                        <label for="expyear">Exp Year</label>
                                                                        <input type="text" id="expyear" name="expyear" placeholder="2018"/>
                                                                    </div>
                                                                    <div classname="col-50">
                                                                        <label for="cvv">CVV</label>
                                                                        <input type="text" id="cvv" name="cvv" placeholder="352"/>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <label>
                                                            <input type="checkbox" checked="checked" name="sameadr"/> Shipping address same as billing
                                                        </label>
                                                        <input type="submit" value="Continue to checkout" classname="btn"/>
                                                        </form>
                                                </div>
                                            </div>

                                            <div classname="col-25">
                                                <div classname="container">
                                                    <h4>Cart
                                                        <span classname="price" style={{color:"black"}}>
                                                            <i classname="fa fa-shopping-cart"></i>
                                                            <b>4</b>
                                                        </span>
                                                    </h4>
                                                    <p><a href="#">Product 1</a> <span classname="price">$15</span></p>
                                                    <p><a href="#">Product 2</a> <span classname="price">$5</span></p>
                                                    <p><a href="#">Product 3</a> <span classname="price">$8</span></p>
                                                    <p><a href="#">Product 4</a> <span classname="price">$2</span></p>
                                                    <hr></hr>
                                                        <p>Total <span classname="price" style={{color:"black"}}><b>$30</b></span></p>
                                                </div>
                                            </div>
                                        </div>
                                </div>
    )}


                                export default Checkout