import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const Products = ({ cartItems, addToCart, removeFromCart, refreshCart, isAuthenticated }) => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mb-2" onClick={() => navigate('/')}>
                KUPILUKI.BY
            </button>
            <div className="row">
                <div className="col-md-10">
                    <h2 className="mb-4">Список товаров</h2>
                    <ProductList refreshCart={refreshCart} isAuthenticated={isAuthenticated} />
                </div>
                <div className="col-md-2">
                    <h2 className="mb-2">Корзина</h2>
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



