import api from './api';

// Получение списка товаров
export const fetchProducts = async () => {
    const response = await api.get('/products/');
    return response.data; // Ожидаемый ответ: массив товаров
};

// Получение деталей конкретного товара
export const fetchProductDetail = async (productId) => {
    const response = await api.get(`/products/${productId}/`);
    return response.data;
};
