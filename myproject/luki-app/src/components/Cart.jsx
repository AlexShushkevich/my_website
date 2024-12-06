import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="d-flex justify-content-between align-items-center mb-2">
                            <span>
                                {item.product.name} ({item.quantity} шт.)
                            </span>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromCart(item.product.id)}
                            >
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



