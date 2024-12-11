import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
            {product.image && (
                <img src={product.image} alt={product.name} className="product-image" />
            )}
            <div className="product-info">
                <h5 className="product-title">{product.name}</h5>
                <p className="product-price">{product.price} руб.</p>
                <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                    }}
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
