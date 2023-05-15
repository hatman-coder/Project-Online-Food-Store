import React from "react";
import "./style/cartStyle.css";

const OrderDetail = ({ orderList }) => {
    const apiDateString = null

    return (
        <React.Fragment key={orderList.id}>
            <tr>
                <td>{orderList.order_master_id.order_no}</td>
                <td>{orderList.order_master_id.order_status.delivered}</td>
                <td>{orderList.order_master_id.order_time}</td>
                <td>{orderList.order_master_id.delivery_time}</td>
                <td>{orderList.order_master_id.customer_detail.contact_number}</td>
                <td>{orderList.order_master_id.customer_detail.delivery_address}, {orderList.order_master_id.customer_detail.house_no}</td>
                <td>{orderList.order_master_id.total}</td>
            </tr>
        </React.Fragment>
    )

}

export default OrderDetail