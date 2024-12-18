import React, { useState } from 'react';
import './Cart.css';
import ModalOrder from './ModalOrder';

const Cart = ({ cartItems, removeFromCart, userProfile }) => {
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="cart-container">
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="cart-item d-flex justify-content-between align-items-center mb-2">
                            <span>{item.product.name} ({item.quantity} шт.)</span>
                            <button
                                className="btn btn-danger btn-sm remove-btn"
                                onClick={() => removeFromCart(item.product.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                    <div className="total">
                        <h5>Итого: <span>{total.toFixed(2)} руб.</span></h5>
                    </div>
                    <button
                        className="btn btn-primary btn-order"
                        onClick={() => setOrderModalOpen(true)}
                    >
                        Заказать
                    </button>
                </div>
            ) : (
                <p>Корзина пуста</p>
            )}
            <ModalOrder
                isOpen={isOrderModalOpen}
                onClose={() => setOrderModalOpen(false)}
                userProfile={userProfile}
                cartItems={cartItems}
            />
        </div>
    );
};

export default Cart;
