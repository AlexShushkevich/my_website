import React from 'react';

const ProductCard = ({ product, addToCart }) => (
    <div className="card">
        {product.image && <img src={`http://127.0.0.1:8000/media/${product.image}`} alt={product.name} className="card-img-top" />}
        <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text"><strong>{product.price} руб.</strong></p>
            <button onClick={addToCart} className="btn btn-primary">Добавить в корзину</button>
        </div>
    </div>
);

export default ProductCard;


