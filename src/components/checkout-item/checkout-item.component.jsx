import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-item.styles.scss"

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, quantity, price} = cartItem;
    const {removeItemFromCart, addItemToCart, removeAllQuantities} = useContext(CartContext);

    const removeItem = () => removeItemFromCart(cartItem);
    const removeItemCompletely = () => removeAllQuantities(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container"><img src={imageUrl} alt={`${name}`} /></div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItem}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => addItemToCart(cartItem)}>&#10095;</div>
            </span>
            <span className="price">${price} per Item</span>
            <div className="remove-button" onClick={removeItemCompletely}>&#10005;</div>
        </div>
    )
};

export default CheckoutItem;