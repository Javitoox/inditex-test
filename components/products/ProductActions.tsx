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
  const { addItem, setCount } = useCart();
  const [selectedColor, setSelectedColor] = useState<
    number | string | undefined
  >(product.options?.colors?.[0]?.code);
  const [selectedColorName, setSelectedColorName] = useState<
    string | undefined
  >(product.options?.colors?.[0]?.name);
  const [selectedStorage, setSelectedStorage] = useState<
    number | string | undefined
  >(product.options?.storages?.[0]?.code);
  const [selectedStorageName, setSelectedStorageName] = useState<
    string | undefined
  >(product.options?.storages?.[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (
      product.options?.colors &&
      product.options.colors.length > 0 &&
      !selectedColor
    ) {
      toast.error('Por favor selecciona un color');
      return;
    }
    if (
      product.options?.storages &&
      product.options.storages.length > 0 &&
      !selectedStorage
    ) {
      toast.error('Por favor selecciona un almacenamiento');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.addToCart(
        product.id,
        selectedColor ? String(selectedColor) : '',
        selectedStorage ? String(selectedStorage) : '',
        quantity,
      );

      /*
      Según los requerimientos de la prueba, debemos usar el valor que devuelve
      la API en response.count para actualizar el contador del carrito.

      La API siempre devuelve count: 1 cuando la operación es exitosa,
      independientemente de la cantidad (quantity) de productos añadidos
      o el número total de items ya existentes en el carrito.

      Dado que la API devuelve count: 1 en cada adición exitosa, el número
      total de productos en el carrito debe calcularse como la suma acumulativa 
      de todos los count recibidos de la API.

      De esta forma cumplimos con usar response.count de la API mientras
      mantenemos una representación lógica del número total de productos.
      */

      setCount((prevCount) => prevCount + response.count);

      addItem({
        _id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        id: product.id,
        brand: product.brand,
        model: product.model,
        quantity,
        price: product.price,
        imgUrl: product.imgUrl,
        colorCode: selectedColor,
        colorName: selectedColorName,
        storageCode: selectedStorage,
        storageName: selectedStorageName,
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
    product.options,
    quantity,
    selectedColor,
    selectedColorName,
    selectedStorage,
    selectedStorageName,
    addItem,
    setCount,
  ]);

  return (
    <div className="space-y-4">
      {product.options?.colors && product.options.colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Color
          </label>
          <select
            value={selectedColor ?? ''}
            onChange={(e) => {
              setSelectedColor(e.target.value || undefined);
              const color = product.options?.colors?.find(
                (c) => String(c.code) === e.target.value,
              );
              if (color) {
                setSelectedColorName(color.name);
              }
            }}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {product.options.colors.map((color, index) => (
              <option key={`color-${color.code}-${index}`} value={color.code}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {product.options?.storages && product.options.storages.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Almacenamiento
          </label>
          <select
            value={selectedStorage ?? ''}
            onChange={(e) => {
              setSelectedStorage(e.target.value || undefined);
              const storage = product.options?.storages?.find(
                (s) => String(s.code) === e.target.value,
              );
              if (storage) {
                setSelectedStorageName(
                  storage.name || `${storage.capacity}GB` || undefined,
                );
              }
            }}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {product.options.storages.map((storage, index) => (
              <option
                key={`storage-${storage.code}-${index}`}
                value={storage.code}
              >
                {storage.name || `${storage.capacity}GB`}
              </option>
            ))}
          </select>
        </div>
      )}

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
