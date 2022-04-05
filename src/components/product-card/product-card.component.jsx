import React, { useContext } from "react";

import "./product-card.styles.scss";
import Button from "../button/button.component"

import {CartContext} from "../../context/cart.context"

const ProductCard = ({product}) => {
    const { name, price, imageUrl} = product;
    const {selectedProducts ,setSelectedProducts} = useContext(CartContext);

    // const addToContextCard = () => {
    //     // console.log(name)
    //     setSelectedProducts(name)
    // }

    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" >ADD TO CARD</Button>
        </div>
    )

}

export default ProductCard;