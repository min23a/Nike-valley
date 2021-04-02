import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './Home.css'

const Home = () => {
    const [products,setProducts] = useState([])
    const showSpinner = () => {
            document.getElementById('spinner').classList.toggle('d-none')
    }
    useEffect(() => {
        showSpinner()
        fetch('https://lychee-custard-72086.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            showSpinner()
        })
    },[])
    console.log(products);
    return (
        <div>
            <form className="form-inline mt-5">
                <div className="m-auto width">
                    <input style={{ width: '75%' }} className="form-control bg-light border" type="search" placeholder="&#xF002; Search Products..." aria-label="Search" />
                    <button style={{ width: '25%' }} className="btn btn-success border" type="submit">Search</button>
                </div>
            </form>
            <div className="d-flex justify-content-center mt-5">
                <div id="spinner" className=" spinner-border text-success d-none" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="Grid_responsive mt-5">
                { 
                    products.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
                }
                
            </div>
        </div>
    );
};

export default Home;