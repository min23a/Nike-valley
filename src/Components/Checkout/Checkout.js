import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../App';

const Checkout = () => {
    const {id} = useParams();
    const [product,setProduct] = useState({});
    const {users} = useContext(dataContext);
    const [user] = users;
    const {displayName, email} = user;
    const [order,setOrder] = useState({
        name: displayName,
        email : email,
        productDetail: product,
        quantity : 1,
        time: new Date()
    });
    useEffect(() => {
        fetch(`https://lychee-custard-72086.herokuapp.com/product/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [id])
    const handleOrder = () => {
        console.log(order)
        axios.post('https://lychee-custard-72086.herokuapp.com/orders', order)
            .then(res => console.log(res))
        document.getElementById('successText').classList.toggle('d-none');
    }
    return (
        <div  className="container m-5 p-5">
            <h3>Checkout</h3>
            <div className="container m-5 d-flex justify-content-center">
                <table className="w-75">
                    <thead>
                        <tr>
                            <th>Name</th>

                            <th>Quantity</th>

                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><hr /></td>
                            <td><hr /></td>
                            <td><hr /></td>
                        </tr>
                        <tr>
                            <td>{product.productName}</td>
                            <td className="ml-2">1</td>
                            <td>$ {product.price}</td>
                        </tr>
                        <tr>
                            <td><hr /></td>
                            <td><hr /></td>
                            <td><hr /></td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>$ {product.price}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={handleOrder} className="btn btn-success">Checkout</button>
            </div>
            <h3 id="successText" className="text-success text-center d-none">Order placed SuccessFully!!!</h3>
        </div>
        
    );
};

export default Checkout;