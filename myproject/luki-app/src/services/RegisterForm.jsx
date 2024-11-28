import React, { useState } from 'react';
import { registerUser } from '../services/userService';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            setMessage('Регистрация успешна!');
            console.log('Ответ сервера:', response);
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            setMessage('Ошибка регистрации.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
            <input
                type="password"
                name="password2"
                placeholder="Повторите пароль"
                value={formData.password2}
                onChange={handleChange}
                required
            />
            <button type="submit">Зарегистрироваться</button>
            <p>{message}</p>
        </form>
    );
};

export default RegisterForm;
