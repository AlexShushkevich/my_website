import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import './Products.css';

const Products = ({ products = [], cartItems, addToCart, removeFromCart, refreshCart, isAuthenticated }) => {
    const navigate = useNavigate();

    return (
        <div className="products-container">
            <button className="btn btn-primary mb-2" onClick={() => navigate('/')}>
                KUPILUKI.BY
            </button>
            <div className="products-content">
                <div className="product-list-container">
                    <h2>Список товаров</h2>
                    <ProductList products={products} addToCart={addToCart} />
                </div>
                <div className="cart-container">
                    <h2>Корзина</h2>
                    <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                </div>
            </div>
        </div>
    );
};

export default Products;
