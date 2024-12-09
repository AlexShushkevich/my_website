import React from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLoginOpen, onRegisterOpen, onUserClick, onLogout }) => {
    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    KUPILUKI.BY
                </Link>
                <nav className="nav">
                    <a href="/support" className="nav-link">Поддержка</a>
                    <a href="/contacts" className="nav-link">Контакты</a>
                </nav>
                <div className="auth-controls">
                    {isAuthenticated ? (
                        <>
                            {/* Добавляем ссылку для перехода в личный кабинет */}
                            <Link to="/profile" className="user-icon" title="Открыть кабинет">
                                <FaUserCircle size={30} />
                            </Link>
                            <button onClick={onLogout} className="btn btn-secondary">
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary" onClick={onLoginOpen}>
                                Войти
                            </button>
                            <button className="btn btn-secondary" onClick={onRegisterOpen}>
                                Зарегистрироваться
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
