'use client';

import Image from 'next/image';

export interface CartItemData {
  _id: string;
  id: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  imgUrl: string;
  colorName?: string;
  storageName?: string;
}

interface CartItemProps {
  item: CartItemData;
  onRemove: (itemId: string) => void;
}

export const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <Image
          src={item.imgUrl}
          alt={`${item.brand} ${item.model}`}
          fill
          loading="eager"
          className="object-cover"
          sizes="100px"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {item.brand}
          </p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {item.model}
          </h3>
          <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {item.colorName && (
              <p>
                Color: <span className="font-semibold">{item.colorName}</span>
              </p>
            )}
            {item.storageName && (
              <p>
                Almacenamiento:{' '}
                <span className="font-semibold">{item.storageName}</span>
              </p>
            )}
            <p>
              Cantidad: <span className="font-semibold">{item.quantity}</span>
            </p>
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {(item.price * item.quantity).toFixed(2)}€
        </p>
      </div>

      <button
        onClick={() => onRemove(item._id)}
        className="self-start rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
      >
        Eliminar
      </button>
    </div>
  );
};
