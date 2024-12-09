import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Header from './Header';
import ModalLogin from './components/ModalLogin';
import ModalRegister from './components/ModalRegister';
import UserProfile from './components/UserProfile';  // Импорт компонента личного кабинета
import api from './components/api';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

    // Загрузка корзины
    const fetchCart = async () => {
        try {
            const response = await api.get('/cart/');
            setCartItems(response.data.items);
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated]);

    // Добавление товара в корзину
    const addToCart = async (productId, quantity = 1) => {
        if (!isAuthenticated) {
            alert('Для добавления товара в корзину необходимо войти!');
            return;
        }

        try {
            await api.post('/cart/', { product_id: productId, quantity });
            fetchCart();
        } catch (error) {
            console.error('Ошибка при добавлении товара:', error.response?.data || error.message);
        }
    };

    // Удаление товара из корзины
    const removeFromCart = async (productId) => {
        try {
            await api.delete('/cart/', { data: { product_id: productId } });
            fetchCart();
        } catch (error) {
            console.error('Ошибка при удалении товара:', error.response?.data || error.message);
        }
    };

    // Обработка входа
    const handleLogin = () => {
        console.log('User logged in');
        setIsAuthenticated(true);
        fetchCart();
        setLoginModalOpen(false);
    };

    // Обработка выхода
    const handleLogout = () => {
        console.log('User logged out');
        setIsAuthenticated(false);
        setCartItems([]);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    // Открытие личного кабинета
    const handleUserClick = () => {
        alert('Открыть кабинет пользователя');
    };

    // Отладка открытия/закрытия модальных окон
    const openLoginModal = () => {
        console.log('Opening login modal');
        setLoginModalOpen(true);
    };

    const openRegisterModal = () => {
        console.log('Opening register modal');
        setRegisterModalOpen(true);
    };

    const closeLoginModal = () => {
        console.log('Closing login modal');
        setLoginModalOpen(false);
    };

    const closeRegisterModal = () => {
        console.log('Closing register modal');
        setRegisterModalOpen(false);
    };

    return (
        <Router>
            <div className="App">
                <Header
                    isAuthenticated={isAuthenticated}
                    onLoginOpen={openLoginModal}
                    onRegisterOpen={openRegisterModal}
                    onUserClick={handleUserClick}
                    onLogout={handleLogout}
                />
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
                    <Route path="*" element={<NotFound />} />
                </Routes>


                <ModalLogin
                    isOpen={isLoginModalOpen}
                    onClose={closeLoginModal}
                    handleLogin={handleLogin}
                />
                <ModalRegister
                    isOpen={isRegisterModalOpen}
                    onClose={closeRegisterModal}
                />
            </div>
        </Router>
    );
};

export default App;
