import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OrderDetail from "./OrderMaster";


const OrderMasterList = () => {


  const [data, setData] = useState([])
  const [error, setError] = useState([])
  const token = Cookies.get('auth');
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  const OrderList = () => {
    if (headers) {
      axios.get('http://localhost:8000/orderMaster/', { headers }).then(res => {
        if (res.data) {
          setData(res.data)
          console.log(res.data)
        }
        else {
          console.log('No response')
        }
      }).catch(err => {
        if (err) {
          setError(err)
          console.log(err)
        }
      })
    }

  }

  useEffect(() => {
    OrderList()
  }, [])

  if (data.length !== 0) {
    return (
      <div className="container orderDetail-container">
        <div style={{ overflow: "hidden" }}>
          <h1 style={{ paddingBottom: '3rem', alignContent: 'center', textAlign: 'center', fontStyle: 'bold' }}>Order History</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order No</th>
                <th scope="col">Delivery Status</th>
                <th scope="col">Order Time</th>
                <th scope="col">Estimated Delivery Time</th>
                <th scope="col">Contact</th>
                <th scope="col">Delivery Address</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                (item) => {
                  return <OrderDetail key={item.id} orderList={item} />;
                }
              )}
            </tbody>
          </table>
        </div>

      </div>
    );
  }

  else {
    return (
      <div>
        <div className="empty-cart-img-div">
          <img src="no-record.png" className="orderList-empty-img" style={{ height: '400px' }} alt="empty-cart-img" />
        </div>
        <br></br>
        <p style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5rem', fontWeight: 'bold' }}>You have no order history !</p>
      </div>

    )
  }


}



export default OrderMasterList







