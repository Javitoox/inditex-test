'use client';

import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { useCart } from '@/app/providers/CartProvider';
import { ActionButton } from '@/ui/ActionButton';
import { CustomSelect } from '@/ui/Select';
import { QuantitySelector } from '@/ui/QuantitySelector';
import { Message } from '@/ui/Message';
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
    if (!product.price || product.price <= 0) {
      toast.error('Este producto no tiene precio disponible');
      return;
    }
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
      {(!product.price || product.price <= 0) && (
        <Message
          type="warning"
          message="Este producto no tiene precio disponible"
        />
      )}

      {product.options?.colors && product.options.colors.length > 0 && (
        <CustomSelect
          label="Color"
          value={selectedColor}
          onChange={(value) => {
            setSelectedColor(value);
            const color = product.options?.colors?.find(
              (c) => String(c.code) === String(value),
            );
            if (color) {
              setSelectedColorName(color.name);
            }
          }}
          options={product.options.colors.map((color) => ({
            code: color.code,
            label: color.name,
          }))}
        />
      )}

      {product.options?.storages && product.options.storages.length > 0 && (
        <CustomSelect
          label="Almacenamiento"
          value={selectedStorage}
          onChange={(value) => {
            setSelectedStorage(value);
            const storage = product.options?.storages?.find(
              (s) => String(s.code) === String(value),
            );
            if (storage) {
              setSelectedStorageName(
                storage.name || `${storage.capacity}GB` || undefined,
              );
            }
          }}
          options={product.options.storages.map((storage) => ({
            code: storage.code,
            label: storage.name || `${storage.capacity}GB`,
          }))}
        />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Cantidad
        </label>
        <div className="mt-2">
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>
      </div>

      <ActionButton
        onClick={handleAddToCart}
        isLoading={isLoading}
        disabled={!product.price || product.price <= 0}
        label="Añadir al carrito"
        loadingLabel="Añadiendo..."
      />
    </div>
  );
};
