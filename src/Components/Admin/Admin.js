import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="w-100">
            <div className="row">
                <div className="col-md-3 bg-dark">
                    <li><Link to='/addProduct'>Add Product</Link></li>
                    <li><Link to='/manageProduct'>Manage Product</Link></li>
                </div>
                <div className="col-md-9">

                </div>
            </div>
        </div>
    );
};

export default Admin;