'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import toast from 'react-hot-toast';
import type { CartItemDetail } from '@/lib/types/product';

interface CartContextType {
  count: number;
  items: CartItemDetail[];
  addItem: (item: CartItemDetail) => void;
  removeItem: (itemKey: string) => void;
  clearCart: () => void;
  setCount: (countOrUpdater: number | ((prev: number) => number)) => void;
  decrementCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItemDetail[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [count, setCountState] = useState(0);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('cart_items');
      const storedCount = localStorage.getItem('cart_count');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      if (storedCount) {
        const parsedCount = parseInt(storedCount, 10);
        setCountState(Math.max(0, parsedCount));
      } else {
        setCountState(0);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCountState(0);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('cart_items', JSON.stringify(items));
        localStorage.setItem('cart_count', String(count));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [isHydrated, items, count]);

  const addItem = (item: CartItemDetail) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i._id !== itemId));
    toast.success('Producto eliminado del carrito');
  };

  const clearCart = () => {
    setItems([]);
    setCountState(0);
    toast.success('Carrito vaciado');
  };

  const decrementCount = () => {
    setCountState((prev) => Math.max(0, prev - 1));
  };

  const value: CartContextType = {
    count,
    items,
    addItem,
    removeItem,
    clearCart,
    setCount: setCountState,
    decrementCount,
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
