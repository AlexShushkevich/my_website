import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Registration from './components/Registration';
import Login from './components/Login';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Стейт для отслеживания состояния аутентификации

    // Загрузка корзины из localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Сохранение корзины в localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Добавить товар в корзину
    const addToCart = (product) => {
        if (!isAuthenticated) {
            alert('Для добавления товара в корзину необходимо войти!');
            return;
        }

        const existingIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingIndex >= 0) {
            const updatedCart = [...cartItems];
            updatedCart[existingIndex].quantity += 1;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // Удалить товар из корзины
    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
    };

    // Функции для входа и регистрации
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home addToCart={addToCart} />} />
                    <Route
                        path="/products"
                        element={
                            <Products
                                cartItems={cartItems}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                                isAuthenticated={isAuthenticated} // Передаем статус аутентификации
                            />
                        }
                    />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/logout" element={<NotFound />} />
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




