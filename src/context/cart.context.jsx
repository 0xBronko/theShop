import React, { createContext, useEffect, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productstoadd
    // .find mehtod retuns boolean, und es soll nur true returnen, wenn bisherige cartitems id mit producttoaddId matched
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if found, increment quantity also wenn in der Zeile hierüber ein cartItem gefunden wurde
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } // wenn das item mit dem addedItem id übereinstimmt, soll quantity addiert werden, weil es ja bereits im warenkorb ist
                : cartItem  // ansonsten soll das item einfach zum array neu hinzugefügt werden, weil es noch nicht im Warenkorb liegt
        ); 
    }

    // return new array with modified cartitems/ new cart item
    // added product ist eine neues Produkt:
    return [...cartItems, {...productToAdd, quantity: 1}]; // wir erstellen ein neues array mit allen bisherigen cartitems, den products to add und quanitity extra
}



const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    // check if quantity is equal to 1, if it is remove that item from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
    }

    // return back cartitems with matching cart item with reduced quanity
    return cartItems.map(cartItem => 
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        )
}

const removeCartItemCompletely = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},      //also nicht den state setzen sondern addieren(das war mein Problem) -> nicht über useState
    // selectedProducts: [],
    // setSelectedProducts: () => null,
    cartCount: 0,
    removeItemFromCart: () => {},
    removeAllQuantities: () => {},
    cartTotal: 0
});


export const CartProvider = ({children}) => {
    // const [selectedProducts, setSelectedProducts] = useState(null);
    // const value = {selectedProducts, setSelectedProducts};
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])
    

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const removeAllQuantities = (cartItemToClear) => {
        setCartItems(removeCartItemCompletely(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, removeAllQuantities, cartTotal};
    
    // console.log(selectedProducts);
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}
