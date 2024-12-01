import React from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';


const Products = ({ cartItems, addToCart, removeFromCart,  }) => (
    <div className="container mt-5">
        <div className="row">
            {/* Колонка для списка товаров */}
            <div className="col-md-8">
                <h2 className="mb-4">Список товаров</h2>
                <ProductList addToCart={addToCart} />
            </div>
            {/* Колонка для корзины */}
            <div className="col-md-4">
                <h2 className="mb-4">Корзина</h2>
                <Cart
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                />
            </div>
        </div>
    </div>
);

export default Products;
