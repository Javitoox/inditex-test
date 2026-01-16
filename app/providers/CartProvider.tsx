'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

export interface CartItemDetail {
  id: string;
  brand: string;
  model: string;
  quantity: number;
  price: number;
  imgUrl: string;
}

interface CartContextType {
  count: number;
  setCount: (count: number) => void;
  items: CartItemDetail[];
  addItem: (item: CartItemDetail) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItemDetail[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('cart_items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('cart_items', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [isHydrated, items]);

  const addItem = (item: CartItemDetail) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const value: CartContextType = {
    count,
    setCount: () => {},
    items,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
