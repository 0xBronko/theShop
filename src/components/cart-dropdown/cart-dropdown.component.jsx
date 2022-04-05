import React, { useContext } from "react";

import "./cart-dropdown.styles.scss";
import Button from "../button/button.component"

import {CartContext} from "../../context/cart.context"

const CartDropdown = () => {

    // const {selectedProducts} = useContext(CartContext);

    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">

            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;