'use client';

import {
  createContext,
  useCallback,
  useContext,
  type PropsWithChildren,
} from 'react';
import toast from 'react-hot-toast';
import { useCartStorage } from './hooks/useCartStorage';
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
  const { items, count, setItems, setCount: setCountState } = useCartStorage();

  const addItem = useCallback(
    (item: CartItemDetail) => {
      setItems((prevItems) => [...prevItems, item]);
    },
    [setItems],
  );

  const removeItem = useCallback(
    (itemId: string) => {
      setItems((prevItems) => prevItems.filter((i) => i._id !== itemId));
      toast.success('Producto eliminado del carrito');
    },
    [setItems],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setCountState(0);
    toast.success('Carrito vaciado');
  }, [setItems, setCountState]);

  const decrementCount = useCallback(() => {
    setCountState((prev) => Math.max(0, prev - 1));
  }, [setCountState]);

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
