import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list">
            {products && products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))
            ) : (
                <p>Товары не найдены.</p>
            )}
        </div>
    );
};

export default ProductList;
