import React, { useState } from 'react';
import ReactModal from 'react-modal';
import api from './api';
import './Modal.css';

ReactModal.setAppElement('#root');

const ModalRegister = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.post('/users/register/', formData);
            setMessage('Регистрация успешна!');
            setFormData({ username: '', password: '', email: '' });
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Регистрация"
            className="custom-modal-size"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <h2>Регистрация</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Логин"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading} className="btn-submit">
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
                <button onClick={onClose} className="btn-close">
                    Закрыть
                </button>
            </div>
        </ReactModal>
    );
};

export default ModalRegister;
