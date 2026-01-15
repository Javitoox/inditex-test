'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

interface CartContextType {
  count: number;
  setCount: (count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart_count');
      if (stored) {
        setCount(parseInt(stored, 10));
      }
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('cart_count', count.toString());
      } catch (error) {
        console.error('Error saving cart count:', error);
      }
    }
  }, [count, isHydrated]);

  const value: CartContextType = {
    count,
    setCount,
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
