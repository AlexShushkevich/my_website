import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

ReactModal.setAppElement('#root');

const ModalCallRequest = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', consent: false });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!formData.name || !formData.phone || !formData.consent) {
            setError('Заполните все обязательные поля.');
            return;
        }

        try {
            // Отправляем данные в Telegram
            const telegramApiUrl = `https://api.telegram.org/bot7678597087:AAF0iIrFeUDcgJTOYyBH1WPI6UzxyL9ACrA/sendMessage`;
            await fetch(telegramApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: '1338844592',
                    text: `Новый запрос звонка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}`,
                }),
            });
            setMessage('Запрос успешно отправлен!');
            setFormData({ name: '', phone: '', consent: false });
            onClose();
        } catch (error) {
            console.error('Ошибка отправки запроса:', error);
            setError('Не удалось отправить запрос.');
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Заказать звонок"
            className="custom-modal-size"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <h2>Заказать звонок</h2>
                <p2>Представьтесь, мы Вам перезвоним</p2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Ваше имя *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Телефон *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                required
                            />
                            Я согласен на обработку персональных данных *
                        </label>
                    </div>
                    <button type="submit" className="btn-submit">
                        Отправить
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                </form>
                <button onClick={onClose} className="btn-close">Закрыть</button>
            </div>
        </ReactModal>
    );
};

export default ModalCallRequest;
