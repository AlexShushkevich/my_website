import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Ошибка при загрузке товаров:', error));
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
};

export default ProductList;