import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Addproduct.css"

const Addproduct = () => {
    const [product, setProduct] = useState({
        productName: '',
        productPhoto: '',
        price: ''
    })
    const handleChange = (e) => {
        const newProduct = { ...product };
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);
    }
    const handleChangeImg = (e) => {
        console.log(e.target.files[0])
        const imgData = new FormData();
        imgData.set('key', '0fb03a882241f5c04128b1b8370fe608')
        imgData.append('image', e.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(function (response) {
                product.productPhoto = response.data.data.display_url;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleSubmit = () => {
        console.log(product);
        axios.post('https://lychee-custard-72086.herokuapp.com/addProduct', product)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="w-100">
            <div className="row">
                <div className="col-md-3 bg-dark adminNav">
                    <li className="m-3" style={{ fontSize: '24px', listStyle: 'none' }}><Link to='/addProduct'>Add Product</Link></li>
                    <li className="m-3" style={{ fontSize: '24px', listStyle: 'none' }}><Link to='/manageProduct'>Manage Product</Link></li>
                </div>
                <div className="col-md-9">
                    <input onBlur={handleChange} type="text" name="productName" id="productName" placeholder="Product Name..." /><br/><br/>
                    <input onChange={handleChangeImg} type="file" name="productPhoto" id="productPhoto" /><br/><br/>
                    <input onBlur={handleChange} type="number" name="price" id="price" placeholder="Price..." /><br/><br/>
                    <input className="btn-success" onClick={handleSubmit} type="submit" />
                </div>
            </div>
        </div>
    );
};

export default Addproduct;