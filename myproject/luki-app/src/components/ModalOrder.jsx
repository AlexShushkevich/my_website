import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import './ModalOrder.css';

ReactModal.setAppElement('#root');

const ModalOrder = ({ isOpen, onClose, userProfile, cartItems }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
        paymentMethod: 'cash',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userProfile) {
            setFormData((prev) => ({
                ...prev,
                firstName: userProfile.first_name || '',
                lastName: userProfile.last_name || '',
                email: userProfile.email || '',
            }));
        }
    }, [userProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.phone) {
            setError('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        const orderDetails = `
            Новый заказ:
            Имя: ${formData.firstName} ${formData.lastName}
            Email: ${formData.email}
            Адрес: ${formData.address}
            Телефон: ${formData.phone}
            Способ оплаты: ${formData.paymentMethod === 'cash' ? 'Наличные' : 'По карте'}
            Товары:
            ${cartItems.map(item => `${item.product.name} - ${item.quantity} шт.`).join('\n')}
        `;

        try {
            const telegramApiUrl = `https://api.telegram.org/bot7678597087:AAF0iIrFeUDcgJTOYyBH1WPI6UzxyL9ACrA/sendMessage`;
            await fetch(telegramApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: '1338844592',
                    text: orderDetails,
                }),
            });

            setMessage('Заказ успешно отправлен!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                phone: '',
                paymentMethod: 'cash',
            });
            onClose();
        } catch (error) {
            console.error('Ошибка отправки заказа:', error);
            setError('Не удалось отправить заказ. Попробуйте позже.');
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Оформление заказа"
            className="modal-order"
            overlayClassName="modal-overlay"
        >
            <h2>Оформление заказа</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Адрес доставки</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Телефон</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Способ оплаты</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                    >
                        <option value="cash">Наличные</option>
                        <option value="card">По карте</option>
                    </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <button type="submit" className="btn-submit">
                    Отправить
                </button>
                <button onClick={onClose} className="btn-close">
                    Закрыть
                </button>
            </form>
        </ReactModal>
    );
};

export default ModalOrder;
