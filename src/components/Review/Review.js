import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happy from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [placeOrder,setPlaceOrder] = useState(false);

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const history = useHistory()
    const handleProceedCheckout = () => {
       history.push('/shipment');
    }

    useEffect(()=> {

        const savedData = getDatabaseCart();
        const productKeys = Object.keys(savedData);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedData[key];
            return product;
        })
        setCart(cartProducts);
    },[])

    let thankYou;
    if(placeOrder){
        thankYou = <img src={happy} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key}
                        removeProduct={removeProduct}
                        product = {pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;