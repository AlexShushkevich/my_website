import axios from 'axios';

// Базовый клиент Axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Укажите базовый URL вашего API
    timeout: 10000, // Тайм-аут в миллисекундах
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерсептор для добавления токена (если требуется)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); // Получение токена из localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
