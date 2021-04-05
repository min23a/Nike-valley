import React from 'react';
import './OrderBox.css'

const OrderBox = ({order}) => {
 console.log(order)
    return (
        <div className="m-5">
            <p>
                <span className="bg-success text-white radius">Name: {order.name}  </span>
                <span className="bg-success text-white radius">Email: {order.email}</span>
                <span className="bg-success text-white radius">Product Name: {order.productDetail.productName}</span>
            </p>
        </div>
    );
};

export default OrderBox;