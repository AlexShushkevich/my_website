import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const categories = [
    { name: "Люки ЕвроСТАНДАРТ", image: "/images/eurostandart.jpg", group: "eurostandard" },
    { name: "Люки Дипломат (съемные)", image: "/images/diplomat.jpg", group: "diplomat" },
    { name: "Напольные люки с амортизаторами Погребок", image: "/images/pogrebok.jpg", group: "pogrebok" },
    { name: "Люки напольные съемные Погребок Мини", image: "/images/pogrebok-mini.jpg", group: "pogrebok-mini" },
];

const Home = () => (
    <div className="home">
        <h1 className="home-title">Добро пожаловать в наш магазин скрытых люков!</h1>
        <div className="categories">
            {categories.map((category) => (
                <Link to={`/category/${category.group}`} key={category.group} className="category-card">
                    <img src={category.image} alt={category.name} className="category-image" />
                    <h3 className="category-title">{category.name}</h3>
                </Link>
            ))}
        </div>
    </div>
);

export default Home;
