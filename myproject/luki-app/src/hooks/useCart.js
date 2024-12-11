import { useState, useEffect } from 'react';
import api from '../components/api';

const useCart = (isAuthenticated) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart/');
            setCartItems(response.data.items);
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error.response?.data || error.message);
        }
    };

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

    const removeFromCart = async (productId) => {
        try {
            await api.delete('/cart/', { data: { product_id: productId } });
            fetchCart();
        } catch (error) {
            console.error('Ошибка при удалении товара:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated]);

    return { cartItems, addToCart, removeFromCart, fetchCart };
};

export default useCart;
