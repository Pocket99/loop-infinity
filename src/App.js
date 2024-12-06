import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TeamMembers from './pages/TeamMembers';
import Store from './pages/Store';
import Stories from './pages/Stories';
import Header from './components/Header';
import Footer from './components/Footer';
import YoYoPage from './pages/YoYoPage';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import ContactForm from "./pages/ContactForm";
import { CartProvider } from './pages/CartContext';
import Modal from './components/Modal';
import './App.css';


function App() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      setShowModal(true);
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setMessage('');
  };

  return(
    <CartProvider>
    <div className="app-container">
      <Router>
        <Header />
        <div className="main-content">
        {showModal && <Modal message={message} onClose={handleCloseModal} />}
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/team' element={<TeamMembers/>} />
            <Route path='/store' element={<Store/>} />
            <Route path='/store/:id' element={<YoYoPage/>} /> {/* Individual YoYo Page */}
            <Route path='/cart' element={<Cart/>} />
            <Route path='/stories' element={<Stories/>} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/contact' element={<ContactForm />} />
          
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
    </CartProvider>
  );
}

export default App;
