import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from '../../App';
import OrderBox from '../OrderBox/OrderBox';

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
    console.log(orders)
    return (
        <div className="container">
            <div className="container">
                <h3>Orders :</h3>
                {
                    orders.map(order => <OrderBox order={order}></OrderBox>)
                }
            </div>
        </div>
    );
};

export default Orders;