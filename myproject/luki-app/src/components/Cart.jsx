import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    const total = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
    );

    return (
        <div>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                            <span>{item.name} ({item.quantity} шт.)</span>
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>
                                Удалить
                            </button>
                        </div>
                    ))}
                    <h5>Итого: {total.toFixed(2)} руб.</h5>
                </div>
            ) : (
                <p>Корзина пуста</p>
            )}
        </div>
    );
};

export default Cart;
