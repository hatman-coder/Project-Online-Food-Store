import axios from "axios";
import { data } from "jquery";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import './style/checkout.css'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const [userId, setUserId] = useState('')
    const [error, setError] = useState('')
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()
    const token = Cookies.get('auth');
    const headers = {
        'Authorization': `Bearer ${token}`
    };


    const GetUser = () => {
        axios.get('http://127.0.0.1:8000/user-auth',
            { headers }
        )
            .then(res => {
                if (res.data) {
                    setUserId(res.data.id)
                    console.log('response', res.data)
                    const data = JSON.parse(localStorage.getItem('cart'))
                    if (data) {
                        setCartData(data)

                    }
                }
                else {
                    console.log('No response !')
                }
            })
            .catch(err => {
                if (err.response.data.detail) {
                    setError(err.response.data.detail)

                }
                else {
                    setError(err)
                    console.log(err)
                }
            })
    }

    useEffect(() => {
        GetUser()
    }, [])

    useEffect(() => {
        console.log('cart', cartData.map(item => item.id))
    }, [cartData])




    const HandleSubmit = () => {
        console.log('clicked')

        let data = JSON.parse(localStorage.getItem('cart'))


        let delivery_address = document.getElementById('delivery_address').value
        let city = document.getElementById('city').value
        let post_code = document.getElementById('post_code').value
        let house_no = document.getElementById('house_no').value
        let contact_number = document.getElementById('contact_number').value
        let payment_type = document.getElementById('payment_type').value
        let total = localStorage.getItem('total')


        let postData = {
            "order_detail": data.map(item => {
                let order = {
                    "product_id": item.id,
                    "product_price": item.price
                };
                if (item.add_ons && item.add_ons.length > 0) {
                    order.add_ons = JSON.stringify(item.add_ons.map(addOn => {
                        return {
                            "name": addOn.add_ons,
                            "price": addOn.add_ons_price
                        };
                    }))
                    order.total_add_ons_price = JSON.stringify(item.add_ons.reduce((total, addOn) => total + addOn.add_ons_price, 0))
                } else {
                    order.add_ons = "None";
                    order.total_add_ons_price = "None"
                }
                return order;
            }),
            "customer_detail": [
                {
                    "delivery_address": delivery_address,
                    "city": city,
                    "post_code": post_code,
                    "house_no": house_no,
                    "contact_number": contact_number,
                    "user_id": userId
                }
            ],
            "order_status": [
                {
                "order_placed": "True",
                "order_pending": "True",
                "delivered": "Pending"
            }
        ],
            "total": total,
            "user_id": userId,
            "payment_type": payment_type
        }

        if(userId && localStorage.getItem('cart') !== undefined ){
            axios.post("http://127.0.0.1:8000/orderMaster/", postData, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('auth')}`
                }
            }).then(res => {
                        if (res.status === 201) {
                          localStorage.removeItem('cart')
                          localStorage.removeItem('total')
                          navigate('/orderSuccess')
                        }
                      })
            .catch(err => {
                if(err){
                    console.log(err)
                    setError(err)
                }
            })
        }
        else(
            setError('Server Error !')
        )


    }
    


    return (
        <div className="container custom-checkout-container">
            <div className="in-container">
                <h2>Order Information</h2>
                <div className="row custom-row">
                    <label className="custom-label" htmlFor="lineone">Delivery Destination</label>
                    <input className="checkout-input" id="delivery_address" type="text" name="delivery" />

                </div>
                <div className="row custom-row">
                    <div className="col2 custom-col2">
                        <label className="custom-label" htmlFor="city">City</label>
                        <input className="checkout-input" id="city" type="text" name="city" />

                    </div>
                    <div className="col2 custom-col2">
                        <label className="custom-label" htmlFor="state">Postal/Zip Code</label>
                        <input className="checkout-input" type="text" id="post_code" name="zipcode" />

                    </div>
                </div>
                <div className="row custom-row">
                    <div className="col2 custom-col2">
                        <label className="custom-label" htmlFor="zipcode">House No</label>
                        <input className="checkout-input" id="house_no" type="text" name="house" />

                    </div>
                    <div className="col2 custom-col2">
                        <label className="custom-label" htmlFor="country">Contact Number</label>
                        <input className="checkout-input" id="contact_number" type="text" name="contact" />

                    </div>
                </div>
                <div className="row custom-row" >
                    <label className="custom-label" htmlFor="payment">Select Payment</label>
                    <select className="custom-select" id="payment_type" name="payment">
                        <option value='2'>Bkash</option>
                        <option value='3'>Nagad</option>
                        <option value='1'>Cash On Delivery</option>

                    </select>

                </div>
                {error && <p style={{ color: "#FF0800", textAlign: 'center', fontSize: '18px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>{error}</p>}
                <div className="row flex-nowrap custom-div" style={{ overflow: 'hidden' }}>
                    <button className="checkout-submit-button" onClick={HandleSubmit}>Confirm order</button>
                </div>
            </div>

        </div>
    )
}


export default Checkout