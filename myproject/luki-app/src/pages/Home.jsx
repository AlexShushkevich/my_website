import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Добро пожаловать в наш магазин!</h1>
            <p className="lead">
                Перейдите на страницу <Link to="/products" className="btn btn-primary">Товары</Link>, чтобы посмотреть наши предложения.
            </p>
        </div>
    );
};

export default Home;
