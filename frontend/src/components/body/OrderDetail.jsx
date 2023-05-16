import React from "react";
import "./style/orderDetail.css";

const OrderDetail = ({ orderList }) => {



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
                <td>{orderList.order_master_id.order_no}</td>
                <td>{orderList.order_master_id.order_status.delivered}</td>
                <td>{DateTimeFormat(orderList.order_master_id.order_time)}</td>
                <td>{TwelveHTimeFormat(orderList.order_master_id.delivery_time)}</td>
                <td>{orderList.order_master_id.customer_detail.contact_number}</td>
                <td>{orderList.order_master_id.customer_detail.delivery_address}, {orderList.order_master_id.customer_detail.house_no}</td>
                <td>{orderList.order_master_id.total}</td>
            </tr>
        </React.Fragment>
    )

}

export default OrderDetail