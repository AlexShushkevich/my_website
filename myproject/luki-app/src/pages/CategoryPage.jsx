import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import api from '../components/api';

const CategoryPage = ({ addToCart, removeFromCart, cartItems }) => {
    const { group } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get(`/products/group/${group}/`);
                setProducts(response.data);
                setLoading(false);


                const categoryMap = {
                    eurostandard: 'Евростандарт',
                    diplomat: 'Дипломат',
                    pogrebok: 'Погребок',
                    'pogrebok-mini': 'Погребок мини',
                };

                setCategoryName(categoryMap[group] || group);
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [group]);

    return (
        <div className="category-page">
            <h2>Товары категории: {categoryName}</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div className="d-flex">
                    <div className="product-list-container">
                        <ProductList products={products} addToCart={addToCart} />
                        <ProductList products={products} currentCategory={group} />
                    </div>
                    <div className="cart-container">
                        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;

