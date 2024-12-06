import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login/', { username, password });
            const { access, refresh } = response.data;

            // Сохраняем токены в localStorage
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // Обновляем состояние аутентификации в родительском компоненте
            handleLogin();

            // Перенаправляем на страницу с товарами
            navigate('/products');
        } catch (err) {
            console.error('Ошибка авторизации:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Ошибка авторизации');
        }
    };

    return (
        <div>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
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








