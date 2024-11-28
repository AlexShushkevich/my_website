import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">404 - Страница не найдена</h1>
            <p className="lead">
                Перейдите на <Link to="/" className="btn btn-secondary">главную страницу</Link>.
            </p>
        </div>
    );
};

export default NotFound;