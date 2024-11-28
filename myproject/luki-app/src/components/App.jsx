import React, { useState, useEffect } from 'react';
import Cart from './components/Cart';
import ProductList from './components/ProductList';

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    // Загружаем корзину из localStorage при загрузке страницы
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Сохраняем корзину в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        const existingIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingIndex >= 0) {
            const updatedCart = [...cartItems];
            updatedCart[existingIndex].quantity += 1; // Увеличиваем количество
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div>
            <h1>Магазин</h1>
            <ProductList addToCart={addToCart} />
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
    );
};

export default App;


