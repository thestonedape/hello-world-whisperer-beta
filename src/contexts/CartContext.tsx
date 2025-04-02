
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for cart items
export type CartItem = {
  id: string;
  brand: string;
  amount: number;
  price: number;
  discount: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalDiscount: () => number;
};

// Create the context with a default value
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotal: () => 0,
  getTotalDiscount: () => 0,
});

// Create a custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component to wrap our app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    // Check if item already exists in cart
    const existingItem = items.find((i) => i.id === item.id);
    
    if (existingItem) {
      // Replace the existing item (for gift cards, we typically don't increase quantity)
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      // Add new item
      setItems([...items, item]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Clear all items from the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate the total price of all items in the cart
  const getTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price;
    }, 0);
  };

  // Calculate the total discount of all items in the cart
  const getTotalDiscount = () => {
    return items.reduce((total, item) => {
      return total + (item.price * item.discount / 100);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getTotalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
