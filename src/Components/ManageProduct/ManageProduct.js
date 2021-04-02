import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import e from 'cors';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

const ManageProduct = () => {
    const [products,setProducts] = useState([]);
    const [productId,setProductId] = useState({})
    const history = useHistory();
    useEffect(() => {
        fetch('https://lychee-custard-72086.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    console.log(products[0])
    
    useEffect(() => {
        fetch(`https://lychee-custard-72086.herokuapp.com/delete/${productId}`, { method: 'DELETE' })
            .then(res => console.log(res));
    },[productId])
    const handleClick = (product_id) => {
        setProductId(product_id);
    }
    return (
        <div className="w-100">
            <div className="row">
                <div className="col-md-3 bg-dark">
                    <li><Link to='/addProduct'>Add Product</Link></li>
                    <li><Link to='/manageProduct'>Manage Product</Link></li>
                </div>
                <div className="col-md-9">
                        {
                            products.map(product =>
                                <li key={product._id} style={{fontSize : '24px',listStyle : 'none'}}>
                                    Name : {product.productName}<br />Price : $ {product.price}
                                    <button onClick={ () =>handleClick(product._id)}  className="btn btn-danger ml-3 text-white"><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
                                </li>)
                        }
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;