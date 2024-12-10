import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => (
    <div className="product-card">
        {product.image && (
            <img src={product.image} alt={product.name} className="product-image" />
        )}
        <div className="product-info">
            <h5 className="product-title">{product.name}</h5>
            <p className="product-price">{product.price} руб.</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>
                Добавить в корзину
            </button>
        </div>
    </div>
);

export default ProductCard;
