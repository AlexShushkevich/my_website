import React from 'react';
import './ProductList.css';

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h5>{product.name}</h5>
                    <h4>{product.price} руб.</h4>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product.id)}>
                        Добавить в корзину
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;

