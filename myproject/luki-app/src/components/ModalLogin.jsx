import React, { useState } from 'react';
import ReactModal from 'react-modal';
import api from './api';
import './Modal.css';

ReactModal.setAppElement('#root');

const ModalLogin = ({ isOpen, onClose, handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login/', { username, password });
            const { access, refresh } = response.data;


            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);


            handleLogin();
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка авторизации');
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Вход"
            className="custom-modal-size"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <h2>Вход</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={false}
                        className="btn-submit"
                    >
                        Войти
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <button
                    onClick={onClose}
                    className="btn-close"
                >
                    Закрыть
                </button>
            </div>
        </ReactModal>
    );
};

export default ModalLogin;
