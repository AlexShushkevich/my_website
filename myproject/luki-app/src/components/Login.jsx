import React, { useState } from 'react';
import api from './api'; // Импортируем api из api.jsx

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log('Попытка входа с данными:', { username, password });
        try {
            const response = await api.post('/users/login/', { username, password });
            console.log('Ответ сервера:', response.data);
            const { access, refresh } = response.data;

            // Сохраняем токены
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // Вызов функции handleLogin
            handleLogin();
            alert('Авторизация успешна!');
        } catch (err) {
            console.error('Ошибка авторизации:', err.response?.data || err.message);
            const errorMessage = err.response?.data?.error || 'Ошибка авторизации';
            setError(errorMessage);
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;







