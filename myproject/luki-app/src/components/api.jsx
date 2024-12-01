import axios from 'axios';

// Базовый клиент Axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Для отправки cookies
});

// Интерсептор для запросов
api.interceptors.request.use(
    (config) => {
        const csrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken'))
            ?.split('=')[1];

        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Интерсептор для ответов
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;


