import React from 'react';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, dispatch } = useCart();

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
                <p>Price: ${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <p className="total-cost">Total: ${calculateTotal().toFixed(2)}</p>
      )}
    </div>
  );
};

export default Cart;

