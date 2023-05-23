import React from "react";
import "./style/orderMaster.css";

const OrderMaster = ({ orderList }) => {



    const DateTimeFormat = (param) => {
        const isoDateString = param
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString()
        const formattedTime = date.toLocaleTimeString()
        const formattedDateTime = formattedDate + " " + formattedTime
        return formattedDateTime
    }

    const TwelveHTimeFormat = (param) => {

        const timeString = param
        const date = new Date();
        const [hours, minutes, seconds] = timeString.split(":");
        date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
        const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
        return formattedTime
    }







    return (
        <React.Fragment key={orderList.id}>
            <tr>
                <td>{orderList.order_no}</td>
                <td>{orderList.order_status.map(item => item.delivered)}</td>
                <td>{DateTimeFormat(orderList.order_time)}</td>
                <td>{TwelveHTimeFormat(orderList.delivery_time)}</td>
                <td>{orderList.customer_detail.map(item => item.contact_number)}</td>
                <td>{orderList.customer_detail.map(item => item.delivery_address)}, {orderList.customer_detail.map(item => item.house_no)}</td>
                <td>{orderList.total}</td>
            </tr>
        </React.Fragment>
    )

}

export default OrderMaster