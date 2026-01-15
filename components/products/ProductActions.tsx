'use client';

import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { useCart } from '@/app/providers/CartProvider';
import apiClient from '@/lib/services/apiClient';
import type { Product } from '@/lib/types/product';

interface ProductActionsProps {
  product: Product;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { setCount } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.code || '',
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storages[0]?.code || '',
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (!selectedColor || !selectedStorage) {
      toast.error('Por favor selecciona color y almacenamiento');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.addToCart(
        product.id,
        selectedColor,
        selectedStorage,
      );
      setCount(response.count);
      toast.success('Producto añadido al carrito');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al añadir el producto al carrito');
    } finally {
      setIsLoading(false);
    }
  }, [product.id, selectedColor, selectedStorage, setCount]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Color
        </label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          {product.colors.map((color) => (
            <option key={color.code} value={color.code}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Almacenamiento
        </label>
        <select
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          {product.storages.map((storage) => (
            <option key={storage.code} value={storage.code}>
              {storage.capacity}GB
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        {isLoading ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>
    </div>
  );
};
