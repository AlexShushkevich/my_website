import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Registration from './components/Registration';
import Login from './components/Login';
import api from './components/api';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Загрузка корзины с сервера
    const fetchCart = async () => {
        try {
            const response = await api.get('/cart/');
            setCartItems(response.data.items);
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error.response?.data || error.message);
        }
    };

    // Обновление корзины
    const refreshCart = () => {
        fetchCart();
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated]);

    const addToCart = async (productId, quantity = 1) => {
        if (!isAuthenticated) {
            alert('Для добавления товара в корзину необходимо войти!');
            return;
        }

        const data = { product_id: productId, quantity };
        try {
            await api.post('/cart/', data);
            alert('Товар добавлен в корзину!');
            refreshCart();
        } catch (err) {
            console.error('Ошибка при добавлении товара:', err.response?.data || err.message);
            alert('Ошибка при добавлении товара.');
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await api.delete('/cart/', { data: { product_id: itemId } });
            alert('Товар удален из корзины!');
            refreshCart(); // Обновляем корзину после удаления
        } catch (err) {
            console.error('Ошибка при удалении товара:', err.response?.data || err.message);
            alert('Ошибка при удалении товара.');
        }
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        fetchCart();
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCartItems([]);
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/products"
                        element={
                            <Products
                                cartItems={cartItems}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                                refreshCart={refreshCart}
                                isAuthenticated={isAuthenticated}
                            />
                        }
                    />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Выйти</button>
                ) : (
                    <div>
                        <button onClick={() => window.location.href = "/login"}>Войти</button>
                        <button onClick={() => window.location.href = "/register"}>Зарегистрироваться</button>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;














