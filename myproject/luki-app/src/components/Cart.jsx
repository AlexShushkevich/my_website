import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    // Рассчитать итоговую сумму
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

    return (
        <div>
            <h2>Корзина</h2>
            {cartItems.map((item, index) => (
                <div key={index}>
                    <span>{item.name} - {item.price} руб.</span>
                    <button onClick={() => removeFromCart(index)}>Удалить</button>
                </div>
            ))}
            <h3>Итого: {total.toFixed(2)} руб.</h3>
        </div>
    );
};

export default Cart;


