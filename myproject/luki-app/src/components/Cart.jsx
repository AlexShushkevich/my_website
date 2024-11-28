import React from 'react';

const Cart = ({ cartItems, setCartItems }) => {
    // Обновление количества товаров
    const updateQuantity = (index, quantity) => {
        const updatedCart = [...cartItems];
        if (quantity > 0) {
            updatedCart[index].quantity = quantity;
            setCartItems(updatedCart);
        } else {
            removeFromCart(index); // Удаляем товар, если количество меньше или равно 0
        }
    };

    // Удаление товара из корзины
    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
    };

    // Подсчёт общей стоимости
    const total = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
    );

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Корзина</h2>
            {cartItems.length > 0 ? (
                <div className="list-group">
                    {cartItems.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="list-group-item d-flex align-items-center justify-content-between"
                        >
                            <div>
                                <h5 className="mb-1">{item.name}</h5>
                                <small className="text-muted">{item.price} руб. / шт.</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-outline-secondary btn-sm me-2"
                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="form-control text-center"
                                    value={item.quantity}
                                    min="1"
                                    style={{ width: '60px' }}
                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                />
                                <button
                                    className="btn btn-outline-secondary btn-sm ms-2"
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromCart(index)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                    <div className="list-group-item d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Итого:</h5>
                        <h5 className="mb-0">{total.toFixed(2)} руб.</h5>
                    </div>
                </div>
            ) : (
                <p className="alert alert-info">Корзина пуста</p>
            )}
        </div>
    );
};

export default Cart;




