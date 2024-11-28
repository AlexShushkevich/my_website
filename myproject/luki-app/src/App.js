import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import NotFound from './pages/NotFound';

const App = () => {
   return (
       <Router>
           <div className="app">
               <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/products" element={<Products />} />
                   <Route path="*" element={<NotFound />} />
               </Routes>
           </div>
       </Router>
   );
};

export default App;
