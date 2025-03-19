"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate total items and price
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Add an item to the cart
  const addItem = (itemToAdd: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      // Check if item already exists in the cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === itemToAdd.id);

      if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;

        toast.success(`Added another ${itemToAdd.name} to your order`);
        return updatedItems;
      } else {
        // Item doesn't exist, add it with quantity 1
        toast.success(`Added ${itemToAdd.name} to your order`);
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (id: number) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.name} from your order`);
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
    toast.info("Your order has been cleared");
  };

  const contextValue: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
