import React from 'react';

const ProductCard = ({ product, addToCart }) => (
    <div className="card mb-3">
        <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">
                {product.description.split('\r\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </p>
            <p className="card-text"><strong>Цена: {parseFloat(product.price).toFixed(2)} руб.</strong></p>
            <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
            >
                Добавить в корзину
            </button>
        </div>
    </div>
);

export default ProductCard;
