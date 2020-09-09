import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    
    const { img, name, seller, price, stock,key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-details'>
                <h5 className="product-name"><Link to={"/product/"+key}>{name}</Link></h5>
                <br />
                <p><small>By:{seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock. Order soon</small></p>
               { props.showAddToCart === true && <button onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                    </button>}
            </div>


        </div>
    );
};

export default Product;