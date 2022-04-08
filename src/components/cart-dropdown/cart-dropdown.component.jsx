import React, { useContext } from "react";


import "./cart-dropdown.styles.scss";
import Button from "../button/button.component"

import {CartContext} from "../../context/cart.context"
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const {cartItems, isCartOpen, setIsCartOpen} = useContext(CartContext);
    // const {selectedProducts} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
        toggleIsCartOpen();
    };

    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;

