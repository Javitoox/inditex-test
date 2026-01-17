'use client';

import { useEffect, useState } from 'react';
import type { CartItemDetail } from '@/lib/types/product';

interface CartStorageState {
  items: CartItemDetail[];
  count: number;
  isHydrated: boolean;
}

interface CartStorageActions {
  setItems: (
    items: CartItemDetail[] | ((prev: CartItemDetail[]) => CartItemDetail[]),
  ) => void;
  setCount: (count: number | ((prev: number) => number)) => void;
}

export const useCartStorage = (): CartStorageState & CartStorageActions => {
  const [items, setItems] = useState<CartItemDetail[]>([]);
  const [count, setCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('cart_items');
      const storedCount = localStorage.getItem('cart_count');

      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }

      if (storedCount) {
        const parsedCount = parseInt(storedCount, 10);
        setCount(Math.max(0, parsedCount));
      } else {
        setCount(0);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCount(0);
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('cart_items', JSON.stringify(items));
        localStorage.setItem('cart_count', String(count));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [isHydrated, items, count]);

  return {
    items,
    count,
    isHydrated,
    setItems,
    setCount,
  };
};
