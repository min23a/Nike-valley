import React from 'react';
import { Link } from 'react-router-dom';
import Addproduct from '../AddProduct/Addproduct';

const Admin = () => {
    return (
        <div className="w-100">
            <div className="row">
                <div className="col-md-3 bg-dark adminNav">
                    <li className="m-3" style={{ fontSize: '24px', listStyle: 'none' }}><Link to='/addProduct'>Add Product</Link></li>
                    <li className="m-3" style={{ fontSize: '24px', listStyle: 'none' }}><Link to='/manageProduct'>Manage Product</Link></li>
                </div>
                <div className="col-md-9">
                    
                </div>
            </div>
        </div>
    );
};

export default Admin;