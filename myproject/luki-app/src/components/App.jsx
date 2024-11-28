import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    return (
        <div className="app">
            <h1>Магазин</h1>
            <ProductList addToCart={addToCart} />
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        </div>
    );
};

export default App;
