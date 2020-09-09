import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total = total + element.price * element.quantity;
    }
    // const total = cart.reduce((total,prd)=>total+prd.price*prd.quantity,0);
    console.log(total);
    
    let shipping = 0;
    if(total>35){
        shipping = 0;
    }
    else if(total>15){
        shipping=4.99;
    }
    else if(total>0){
        shipping=12.99;
    }

    const tax = (total/10).toFixed(2);
    const grandTotal =(total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h4>Order Summary</h4>
            <h5>Item Ordered:{cart.length} </h5>
            <p>product Price: {total} </p>
            <p><small>Shipping cost:{shipping} </small></p>
            <p>Tax+Vat :{tax} </p>
            <p>total price: {grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;