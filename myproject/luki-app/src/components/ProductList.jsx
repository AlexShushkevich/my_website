import React, { useState, useEffect } from 'react';
import api from './api';
import ProductCard from './ProductCard';

const ProductList = ({ refreshCart, isAuthenticated }) => { // Добавляем isAuthenticated в параметры
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Загрузка списка товаров
    useEffect(() => {
        api.get('/products/')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке товаров:', error);
                setLoading(false);
            });
    }, []);

    // Логика добавления товара в корзину
    const addToCart = async (productId, quantity = 1) => {
        if (!isAuthenticated) {
            alert('Для добавления товара в корзину необходимо войти!');
            return;
        }
        const data = { product_id: productId, quantity };
        try {
            await api.post('/cart/', data);
            alert('Товар добавлен в корзину!');
            refreshCart();
        } catch (err) {
            console.error('Ошибка при добавлении товара:', err.response?.data || err.message);
            if (err.response?.status === 401) {
                alert('Вы должны войти в систему, чтобы добавить товары в корзину.');
            } else {
                alert('Ошибка при добавлении товара.');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Товары</h2>
            {loading ? (
                <div>Загрузка...</div>
            ) : (
                <div className="row">
                    {products.map(product => (
                        <div key={product.id} className="col-md-4">
                            <ProductCard
                                product={product}
                                addToCart={() => addToCart(product.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;









