import api from './api';

// Регистрация пользователя
export const registerUser = async (userData) => {
    const response = await api.post('/users/register/', userData);
    return response.data;
};

// Авторизация пользователя
export const loginUser = async (credentials) => {
    const response = await api.post('/token/', credentials);
    return response.data; // Вернет access и refresh токены
};

// Получение текущего пользователя (требуется токен)
export const getCurrentUser = async () => {
    const response = await api.get('/users/me/');
    return response.data;
};
