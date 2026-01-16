'use client';

import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { useCart } from '@/app/providers/CartProvider';
import type { Product } from '@/lib/types/product';

interface ProductActionsProps {
  product: Product;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = useCallback(async () => {
    setIsLoading(true);
    try {
      addItem({
        id: product.id,
        brand: product.brand,
        model: product.model,
        quantity,
        price: product.price,
        imgUrl: product.imgUrl,
      });
      toast.success('Producto añadido al carrito');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al añadir el producto al carrito');
    } finally {
      setIsLoading(false);
    }
  }, [
    product.id,
    product.brand,
    product.model,
    product.price,
    product.imgUrl,
    quantity,
    addItem,
  ]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Cantidad
        </label>
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-16 rounded-lg border border-gray-300 px-3 py-2 text-center text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            +
          </button>
        </div>
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
