import React from 'react';
import './ProductList.css'; // Убедитесь, что стили подключены

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>{product.price} руб.</p>
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

