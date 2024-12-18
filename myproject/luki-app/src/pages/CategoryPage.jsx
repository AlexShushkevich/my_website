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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/products/group/${group}/`, {
                    params: {
                        page: currentPage,
                    },
                });

                setProducts(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 8));
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
    }, [group, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="category-page">
            <h2>Товары категории: {categoryName}</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div className="d-flex">
                    <div className="product-list-container">
                        <ProductList products={products} addToCart={addToCart} />
                        <div className="pagination">
                            <button
                                className="btn btn-secondary"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Назад
                            </button>
                            <span className="page-info">
                                Страница {currentPage} из {totalPages}
                            </span>
                            <button
                                className="btn btn-secondary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Вперед
                            </button>
                        </div>
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
