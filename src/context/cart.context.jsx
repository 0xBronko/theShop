import React, { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    // selectedProducts: [],
    // setSelectedProducts: () => null,
});


export const CartProvider = ({children}) => {
    // const [selectedProducts, setSelectedProducts] = useState(null);
    // const value = {selectedProducts, setSelectedProducts};
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen}
    
    // console.log(selectedProducts);
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}
