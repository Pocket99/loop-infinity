import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TeamMembers from './pages/TeamMembers';
import Store from './pages/Store';
import Stories from './pages/Stories';
import Header from './components/Header';
import Footer from './components/Footer';
import YoYoPage from './pages/YoYoPage';
import Cart from './pages/Cart';
import { CartProvider } from './pages/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
    <div className="app-container">
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/team' element={<TeamMembers/>} />
            <Route path='/store' element={<Store/>} />
            <Route path='/store/:id' element={<YoYoPage/>} /> {/* Individual YoYo Page */}
            <Route path='/cart' element={<Cart/>} />
            <Route path='/stories' element={<Stories/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
    </CartProvider>
  );
}

export default App;
