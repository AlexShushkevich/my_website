import React from 'react';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                    <strong>{product.price} руб.</strong>
                </p>
                <button className="btn btn-success" onClick={() => addToCart(product)}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;