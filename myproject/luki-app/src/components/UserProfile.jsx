import React, { useState, useEffect } from 'react';
import api from '../components/api';
import './UserProfile.css';

const UserProfile = () => {
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        profile_picture: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Загрузка данных профиля
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/profile/');
                setProfileData(response.data);
            } catch (err) {
                console.error('Ошибка загрузки профиля:', err.response?.data || err.message);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProfileData((prev) => ({
            ...prev,
            profile_picture: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const formData = new FormData();
        for (let key in profileData) {
            formData.append(key, profileData[key]);
        }

        try {
            await api.put('/users/profile/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Данные успешно обновлены!');
            setIsEditing(false);
        } catch (err) {
            setError('Ошибка обновления данных.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-profile">
            <h2>Личный кабинет</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label>Имя</label>
                        <input
                            type="text"
                            name="first_name"
                            value={profileData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Фамилия</label>
                        <input
                            type="text"
                            name="last_name"
                            value={profileData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Фото профиля</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsEditing(false)}
                    >
                        Отмена
                    </button>
                </form>
            ) : (
                <div className="profile-view">
                    <div className="profile-picture">
                        {profileData.profile_picture ? (
                            <img
                                src={`http://127.0.0.1:8000${profileData.profile_picture}`}
                                alt="Фото профиля"
                                className="profile-img"
                            />
                        ) : (
                            <p>Фото отсутствует</p>
                        )}
                    </div>
                    <p>Имя: {profileData.first_name}</p>
                    <p>Фамилия: {profileData.last_name}</p>
                    <p>Email: {profileData.email}</p>
                    <button
                        className="btn-submit"
                        onClick={() => setIsEditing(true)}
                    >
                        Редактировать
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
