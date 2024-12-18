import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import api from '../components/api';
import './Products.css';

const Products = ({ cartItems, addToCart, removeFromCart }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/products/', {
                    params: {
                        page: currentPage,
                    },
                });
                setProducts(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10));
            } catch (error) {
                console.error('Ошибка при загрузке товаров:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

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
        <div className="products-container">
            <div className="header-btn">
                <button className="btn btn-primary mb-2" onClick={() => navigate('/')}>
                    KUPILUKI.BY
                </button>
            </div>
            <div className="products-content">
                <div className="product-list-container">
                    <h2>Список товаров</h2>
                    {isLoading ? (
                        <p>Загрузка...</p>
                    ) : (
                        <ProductList products={products} addToCart={addToCart} />
                    )}

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
                    <h2>Корзина</h2>
                    <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
                </div>
            </div>
        </div>
    );
};

export default Products;
