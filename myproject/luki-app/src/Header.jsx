import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ModalCallRequest from './components/ModalCallRequest';
import api from './components/api';

const Header = ({ isAuthenticated, onLoginOpen, onRegisterOpen, onUserClick, onLogout }) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [isCallRequestModalOpen, setCallRequestModalOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchProfile = async () => {
                try {
                    const response = await api.get('/users/profile/');
                    setProfilePicture(response.data.profile_picture);
                } catch (error) {
                    console.error('Ошибка загрузки фото профиля:', error);
                }
            };
            fetchProfile();
        }
    }, [isAuthenticated]);

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    KUPILUKI.BY
                </Link>
                <div className="contact-info">
                    <div className="phone-numbers">
                        <a href="tel:+375297777777" className="phone-link">+375 (29) 777-77-77</a>
                        <a href="tel:+375337777777" className="phone-link">+375 (33) 777-77-77</a>
                    </div>
                    <p className="work-hours">Работаем 9:00 - 18:00</p>
                </div>
                <button
                    className="btn btn-primary call-request-btn"
                    onClick={() => setCallRequestModalOpen(true)}
                >
                    Заказать звонок
                </button>
                <div className="auth-controls">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="user-icon" title="Кабинет">
                                {profilePicture ? (
                                    <img
                                        src={`http://127.0.0.1:8000${profilePicture}`}
                                        alt="Profile"
                                        className="profile-pic-header"
                                    />
                                ) : (
                                    <FaUserCircle size={30} />
                                )}
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
            <ModalCallRequest
                isOpen={isCallRequestModalOpen}
                onClose={() => setCallRequestModalOpen(false)}
            />
        </header>
    );
};

export default Header;
