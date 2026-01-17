'use client';

import Link from 'next/link';

import { Header } from '@/components/products/Header';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { CartSummary } from '@/components/cart/CartSummary';
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
          <CartItemsList items={items} onRemoveItem={handleRemoveItem} />
          <CartSummary total={total} onClearCart={clearCart} />
        </div>
      </main>
    </div>
  );
};

CartPage.displayName = 'CartPage';

export default CartPage;
