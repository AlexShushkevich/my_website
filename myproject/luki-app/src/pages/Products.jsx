import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const Products = () => {
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
        <div className="container mt-5">
            <h1 className="mb-4">Список товаров</h1>
            <div className="row">
                <div className="col-md-8">
                    <ProductList addToCart={addToCart} />
                </div>
                <div className="col-md-4">
                    <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                </div>
            </div>
        </div>
    );
};

export default Products;

