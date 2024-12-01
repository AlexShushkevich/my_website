import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/products/')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке товаров:', error);
                setLoading(false);
            });
    }, []);

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
                                addToCart={addToCart}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
