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

            <div className="cart-fixed">
                <h2>Корзина</h2>
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </div>

            <button className="btn btn-primary mb-3" onClick={handleBackClick}>
                Назад к списку товаров
            </button>

            <div className="product-detail">
                <div className="product-main">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-detail-image"
                    />


                    {product.additional_images?.length > 0 && (
                        <div className="additional-images">
                            <div className="image-gallery">
                                {product.additional_images.map((img) => (
                                    <img
                                        key={img.id}
                                        src={img.image}
                                        alt={`Доп. изображение ${product.name}`}
                                        className="gallery-image"
                                        onClick={() =>
                                            window.open(img.image, '_blank', 'noopener,noreferrer')
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="product-details">
                    <h2 className="product-detail-title">{product.name}</h2>
                    <h2 className="product-detail-price">{product.price} руб.</h2>
                    <button
                        className="btn btn-success btn-add-to-cart"
                        onClick={handleAddToCart}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>

            <div className="product-detail-description">
                <h3>Описание товара</h3>
                <p>{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
