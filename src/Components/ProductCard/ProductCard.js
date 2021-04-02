import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { dataContext } from '../../App';
import './ProductCard.css'

const ProductCard = ({product}) => {
    const {id} = useContext(dataContext);
    const [productID, setProductID] = id;
    console.log(productID);
    const handleProductId = (Id) => {
        setProductID(Id);
    }
    return (
        <div className="my-3">
            <div className="card m-auto" style={{width: '14rem'}}>
                <img className="card-img-top" src={product.productPhoto} alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <span className="price">$ {product.price}</span>
                    <Link onClick={handleProductId(product._id)} className="buy_now btn-success p-2 ml-5" to={"/checkout/" + product._id}>BUY NOW</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;