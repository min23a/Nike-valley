import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ManageProduct.css';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://lychee-custard-72086.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const handleClick = (product_id) => {
        const url = `https://lychee-custard-72086.herokuapp.com/delete/${product_id}`
        console.log(url);
        fetch(url, { method: 'DELETE' })
            .then(res => console.log(res));
        const productLi = document.getElementById(product_id);
        productLi.classList.add('d-none')
    }
    return (
        <div className="w-100">
            <div className="row">
                <div className="col-md-3 bg-dark adminNav">
                    <li className="m-3" style={{ fontSize: '24px', listStyle: 'none' }}><Link to='/addProduct'>Add Product</Link></li>
                    <li className="m-3" style={{ fontSize: '24px', listStyle: 'none' }}><Link to='/manageProduct'>Manage Product</Link></li>
                </div>
                <div className="col-md-9">
                    {
                        products.map(product =>
                            <li key={product._id} id={product._id} className="d-flex justify-content-between mt-2" style={{ fontSize: '24px', listStyle: 'none' }}>
                                <span className="text-success">Name : {product.productName}   </span>
                                <span className="text-primary" > Price : $ {product.price}</span>
                                <button onClick={() => handleClick(product._id)} className="btn btn-danger text-white">
                                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                                </button>
                            </li>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;