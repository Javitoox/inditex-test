'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Header } from '@/components/products/Header';
import { useCart } from '@/app/providers/CartProvider';

const CartPage = () => {
  const { items, removeItem, clearCart, decrementCount } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    decrementCount();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title="Carrito" />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
              Tu carrito está vacío
            </p>
            <Link
              href="/products"
              className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Volver a productos
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Carrito" />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
          >
            ← Volver a productos
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
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
                            Color:{' '}
                            <span className="font-semibold">
                              {item.colorName}
                            </span>
                          </p>
                        )}
                        {item.storageName && (
                          <p>
                            Almacenamiento:{' '}
                            <span className="font-semibold">
                              {item.storageName}
                            </span>
                          </p>
                        )}
                        <p>
                          Cantidad:{' '}
                          <span className="font-semibold">{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="self-start rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Resumen
            </h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 dark:border-gray-700">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
            </div>

            <div className="my-4 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>

            <button className="mb-3 w-full rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
              Proceder al pago
            </button>

            <button
              onClick={clearCart}
              className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

CartPage.displayName = 'CartPage';

export default CartPage;
