// YoYoPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { yoyoData } from './yoyoData';
import { useCart } from './CartContext'; // You'll need to set this context up to manage cart state
import './YoYoPage.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const YoYoPage = (props) => {

  const { id } = useParams();
  const yoyo = yoyoData.find(y => y.id === parseInt(id));
  const { dispatch } = useCart(); // Using a CartContext for adding to cart
  const navigate = useNavigate();
   // State to manage the selected quantity
  const [quantity, setQuantity] = useState(1);

  const addItemToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...yoyo,
        quantity: parseInt(quantity),  // Ensure quantity is a number
      },
    });
  };

  console.log("yoyo data")
  console.log(yoyo)
  return (
    
    <div className="yoyo-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back
      </button>
      <img src={yoyo.imageUrl} alt={yoyo.name} />
      <h2>{yoyo.name}</h2>
      <p>{yoyo.description}</p>
      {/* Conditionally display the video */}
      
      {yoyo.videoUrl && (
        <div className="yoyo-video">
          <iframe 
            title="myFrame"
            width="560" 
            height="315" 
            src={yoyo.videoUrl} 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      )}
      {/* Input for selecting quantity */}
      <label htmlFor="quantity">Quantity: </label>
      <input 
        type="number" 
        id="quantity" 
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={() => addItemToCart()}>Add to Cart</button>
    </div>
  );
};

export default YoYoPage;
