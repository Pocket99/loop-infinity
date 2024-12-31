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
    { code: 'KR', name: 'South Korea' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'SG', name: 'Singapore' },
    { code: 'AU', name: 'Australia' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'CL', name: 'Chile' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DE', name: 'Germany' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EE', name: 'Estonia' },
    { code: 'ES', name: 'Spain' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'GR', name: 'Greece' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IL', name: 'Israel' },
    { code: 'IN', name: 'India' },
    { code: 'IT', name: 'Italy' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'LV', name: 'Latvia' },
    { code: 'MT', name: 'Malta' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NO', name: 'Norway' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'RO', name: 'Romania' },
    { code: 'SE', name: 'Sweden' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'TH', name: 'Thailand' },
    { code: 'ZA', name: 'South Africa' },
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
            <label htmlFor="country-select">Choose your country/region:</label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="country-select"
            >
              <option value="" disabled>Select</option> {/* 默认空选项 */}
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            
            <button className="checkout-button" onClick={handleCheckout} disabled={!selectedCountry}>Checkout</button>
            <p><strong>If you country or region are not listed above, please contact us directly</strong></p>
      </div>)}

    </div>
  );
};

export default Cart;

