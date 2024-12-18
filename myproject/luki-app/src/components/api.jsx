import axios from 'axios';


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


api.interceptors.request.use(
    (config) => {
        const csrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken'))
            ?.split('=')[1];

        const jwtToken = localStorage.getItem('access_token');

        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }

        console.log('Request:', config);
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && error.config && !error.config._retry) {
            error.config._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                        refresh: refreshToken,
                    });

                    const newAccessToken = response.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(error.config);
                }
            } catch (refreshError) {
                console.error('Ошибка обновления токена:', refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }

        console.error('Response Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;



