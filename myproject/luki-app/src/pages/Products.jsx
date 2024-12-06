import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const Products = ({ cartItems, addToCart, removeFromCart, refreshCart, isAuthenticated }) => {
    const navigate = useNavigate(); // Хук для навигации

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mb-4" onClick={() => navigate('/')}>
                На главную
            </button>
            <div className="row">
                <div className="col-md-8">
                    <h2 className="mb-4">Список товаров</h2>
                    <ProductList refreshCart={refreshCart} isAuthenticated={isAuthenticated} />
                </div>
                <div className="col-md-4">
                    <h2 className="mb-4">Корзина</h2>
                    <Cart
                        cartItems={cartItems}
                        removeFromCart={removeFromCart}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;



