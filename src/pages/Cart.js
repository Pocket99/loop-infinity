import React, { useState } from 'react';
import { useCart } from './CartContext';
import './Cart.css';
//import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [selectedCountry, setSelectedCountry] = useState(""); // 初始国家代码

  // 国家列表
  const countryOptions = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'Korea' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'SG', name: 'Singapore' },
  ];
  //const navigate = useNavigate();

  // const handleCheckout = () => {
  //   // 导航到checkout表单页面
  //   navigate('/checkout');
  // };
  const handleCheckout = async () => {
    if (!cart.length) {
      console.error('Cart is empty');
      return;
    }
    console.log('cart:', cart);

    //http://127.0.0.1:5000/api/create-checkout-session //本地测试
    const response = await fetch('https://ych-yoyo.com/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.selectedColor, // Include the selected color
        })),
        country_code: selectedCountry,
      }),
    });
  
    const session = await response.json();
  
    // 重定向到 Stripe 的结账页面
    if (session.url) {
      window.location.href = session.url;
    }
  };

  const increaseQuantity = (id, selectedColor) => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: { id, selectedColor },
    });
  };
  
  const decreaseQuantity = (id, selectedColor) => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: { id, selectedColor },
    });
  };
  
  const removeFromCart = (id, selectedColor) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, selectedColor }, // 确保将 selectedColor 一起传递
    });
  };
  

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <p>{item.name} - {item.selectedColor}</p>
                <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.id, item.selectedColor)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.id, item.selectedColor)}>+</button>
                </div> 
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id,item.selectedColor )}>Remove</button>
            </div>
          ))}
          
        </ul>
      )}
      
      {cart.length === 0 ? (
        <></>
      ) : (<div class="checkout-area">
            <p className="total-cost">Total: ${calculateTotal().toFixed(2)}</p>
             {/* 国家选择器 */}
            <label htmlFor="country-select">Choose your country:</label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="country-select"
            >
              <option value="" disabled>Select a country</option> {/* 默认空选项 */}
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <button className="checkout-button" onClick={handleCheckout} disabled={!selectedCountry}>Checkout</button>
      </div>)}

    </div>
  );
};

export default Cart;

