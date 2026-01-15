'use client';

import Link from 'next/link';

import { Header } from '@/components/products/Header';
import { useCart } from '@/app/providers/CartProvider';

const CartPage = () => {
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Carrito" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg bg-white p-8 text-center dark:bg-gray-800">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Carrito:{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {count} productos
            </span>
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Esta página es un placeholder. Los productos se pueden añadir desde
            la página de detalles.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Seguir comprando
          </Link>
        </div>
      </main>
    </div>
  );
};

CartPage.displayName = 'CartPage';

export default CartPage;
