import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  console.log('Dispatch called:', action);
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if the item with the same id and selectedColor is already in the cart
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id && item.selectedColor === action.payload.selectedColor
      );

      if (existingItemIndex >= 0) {
        // If the item exists, update its quantity
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return updatedCart;
      }

      // If the item does not exist, add it as a new entry
      return [...state, action.payload];

    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id && item.selectedColor === action.payload.selectedColor
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id && item.selectedColor === action.payload.selectedColor
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

    case 'REMOVE_ITEM':
      return state.filter(
        item => !(item.id === action.payload.id && item.selectedColor === action.payload.selectedColor)
      );

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []); // Initial cart state as an empty array

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
