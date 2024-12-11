import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import Products from '../pages/Products';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import UserProfile from '../components/UserProfile';

const RoutesConfig = ({ cartProps }) => {
    const { cartItems, addToCart, removeFromCart, fetchCart, isAuthenticated } = cartProps;

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/products"
                element={
                    <Products
                        cartItems={cartItems}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        isAuthenticated={isAuthenticated}
                    />
                }
            />
            <Route
                path="/category/:group"
                element={
                    <CategoryPage
                        cartItems={cartItems}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        isAuthenticated={isAuthenticated}
                    />
                }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route
                path="/products/:id"
                element={
                    <ProductDetail
                        addToCart={addToCart}
                        cartItems={cartItems}
                        removeFromCart={removeFromCart}
                        refreshCart={fetchCart}
                    />
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default RoutesConfig;
