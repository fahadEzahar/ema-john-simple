import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    const [products,setProducts] = useState(firstTen)

    const [cart,setCart] = useState([]);

    useEffect(()=> {
        const savedData = getDatabaseCart();
        const productKeys = Object.keys(savedData);
        const previousCart = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedData[key];
            return product;
            // console.log(previousCart)
        })
        setCart(previousCart);

    },[])


    const handleAddProduct = (product) => {
            // console.log('clicked',product)
            const toBeAdded = product.key;
            const sameProduct = cart.find(pd => pd.key === toBeAdded);
            let count = 1; 
            let newCart;
            if(sameProduct){
                const count = sameProduct.quantity + 1 ; 
                sameProduct.quantity = count; 
                const others = cart.filter(pd => pd.key !== toBeAdded)
                newCart = [...others,sameProduct];
            }
            else{
                product.quantity = 1;
                newCart = [...cart,product];
            }
            
            setCart(newCart);
            addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="products-container">
                
                    {
                        products.map(pd => 
                        <Product showAddToCart={true} 
                        product={pd} key = {pd.key}
                        handleAddProduct ={handleAddProduct}>
                        </Product>)
                    }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button>Review order</button>
                    </Link>
                </Cart>
            </div>
            
           
        </div>
    );
};

export default Shop;