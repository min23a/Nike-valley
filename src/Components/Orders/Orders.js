import { library } from '@fortawesome/fontawesome-svg-core';
import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from '../../App';

const Orders = () => {
    const {users} = useContext(dataContext)
    const [user] = users;
    // const {displayName} = user;
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        fetch(`https://lychee-custard-72086.herokuapp.com/orders/${user.displayName}`)
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [user])
    return (
        <div>
            {
                orders.map(order => <li>{order.productDetail.productName}</li>)
            }
        </div>
    );
};

export default Orders;