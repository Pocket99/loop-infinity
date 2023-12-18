import React from 'react';
import { useCart } from './CartContext';
import './Cart.css';
//import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useCart();
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
    console.log(cart)
    const response = await fetch('http://127.0.0.1:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({items: cart}) // 发送商品ID或其他识别信息
    });
  
    const session = await response.json();
  
    // 重定向到 Stripe 的结账页面
    if (session.url) {
      window.location.href = session.url;
    }
  };

  const increaseQuantity = (id) => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: { id },
    });
  };
  
  const decreaseQuantity = (id) => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: { id },
    });
  };
  
  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id },
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
                <p>{item.name}</p>
                <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div> 
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          
        </ul>
      )}
      
      {cart.length === 0 ? (
        <></>
      ) : (<div class="checkout-area">
            <p className="total-cost">Total: ${calculateTotal().toFixed(2)}</p>
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>)}

    </div>
  );
};

export default Cart;

