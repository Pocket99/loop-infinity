import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { yoyoData } from './yoyoData';
import { useCart } from './CartContext';
import './YoYoPage.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const YoYoPage = () => {
  const { id } = useParams();
  const yoyo = yoyoData.find(y => y.id === parseInt(id));
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(yoyo.colors[0].name); // Default to the first color

  // Get the image and price for the currently selected color
  const selectedColorDetails = yoyo.colors.find(color => color.name === selectedColor);
  const currentImage = selectedColorDetails?.imageUrl;
  const currentPrice = selectedColorDetails?.price || yoyo.price; // Fallback to default price if not specified


  const addItemToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...yoyo,
        quantity: parseInt(quantity),
        selectedColor,
        imageUrl: currentImage, // Save the selected color image in the cart
        price: currentPrice, // Save the price based on the selected color
      },
    });
  };

  return (
    <div className="yoyo-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back
      </button>
      <div className="yoyo-content">
        {/* Main Yo-Yo Image */}
        <div className="main-image">
          <img src={currentImage} alt={`${yoyo.name} - ${selectedColor}`} />
        </div>
        {/* Yo-Yo Details */}
        <div className="yoyo-details">
          <h2>{yoyo.name}</h2>
          <p>Color: {selectedColor}</p>
          <p>Price: ${currentPrice.toFixed(2)}</p>
          {/* Color Selection */}
          <div className="color-selection">
            <div className="color-options">
              {yoyo.colors.map(color => (
                <img
                  key={color.name}
                  src={color.imageUrl}
                  alt={color.name}
                  className={`color-thumbnail ${color.name === selectedColor ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-selection">
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <button className="add-to-cart-btn" onClick={addItemToCart}>Add to Cart</button>

          {/* Description */}
          <h3>Description</h3>
          <p>{yoyo.description}</p>
          {/* Includes*/}
          <h3>Includes</h3>
          <p>{yoyo.include}</p>



          {/* Conditionally display the video */}
          {yoyo.videoUrl && (
            <div className="yoyo-video">
              <iframe
                title="myFrame"
                width="960"
                height="630"
                src={yoyo.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YoYoPage;
