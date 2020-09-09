import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const style = {
        border: '1px solid lightgray',
        marginBottom: '10px',
        padding: '5px'
    }
    return (
        <div style={style}>
            <h3>{name}</h3>
            <h4> quantity : {quantity}</h4>
            <h4>{price}</h4>
            <br/>
            <button onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;