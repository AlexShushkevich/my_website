import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import ModalLogin from './components/ModalLogin';
import ModalRegister from './components/ModalRegister';
import RoutesConfig from './routes/RoutesConfig';
import useCart from './hooks/useCart';
import useAuth from './hooks/useAuth';


const App = () => {
    const { isAuthenticated, handleLogin, handleLogout } = useAuth();
    const { cartItems, addToCart, removeFromCart, fetchCart } = useCart(isAuthenticated);
    const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = React.useState(false);

    return (
        <Router>
            <div className="App">
                <Header
                    isAuthenticated={isAuthenticated}
                    onLoginOpen={() => setLoginModalOpen(true)}
                    onRegisterOpen={() => setRegisterModalOpen(true)}
                    onLogout={handleLogout}
                />
                <RoutesConfig
                    cartProps={{
                        cartItems,
                        addToCart,
                        removeFromCart,
                        fetchCart,
                        isAuthenticated,
                    }}
                />
                <ModalLogin
                    isOpen={isLoginModalOpen}
                    onClose={() => setLoginModalOpen(false)}
                    handleLogin={handleLogin}
                />
                <ModalRegister
                    isOpen={isRegisterModalOpen}
                    onClose={() => setRegisterModalOpen(false)}
                />
            </div>
        </Router>
    );
};

export default App;
