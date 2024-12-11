import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../components/api';
import './ProductDetail.css';
import Cart from '../components/Cart';

const ProductDetail = ({ addToCart, cartItems, removeFromCart, refreshCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Ошибка загрузки товара:', error.response?.data || error.message);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Загрузка...</p>;
    }

    const handleAddToCart = async () => {
        await addToCart(product.id);
        refreshCart();
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <button className="btn btn-primary mb-3" onClick={handleBackClick}>
                    Назад к списку товаров
                </button>
                <div className="product-detail-card">
                    <img src={product.image} alt={product.name} className="product-detail-image" />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Цена: {product.price} руб.</p>
                    <button
                        className="btn btn-success"
                        onClick={handleAddToCart}
                    >
                        Добавить в корзину
                    </button>
                </div>
                {product.additional_images && product.additional_images.length > 0 && (
                    <div className="additional-images">
                        <h3>Дополнительные фотографии</h3>
                        <div className="image-gallery">
                            {product.additional_images.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image}
                                    alt={`Дополнительное изображение ${product.name}`}
                                    className="gallery-image"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="cart-section">
                <h2>Корзина</h2>
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </div>
        </div>
    );
};

export default ProductDetail;
