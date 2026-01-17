'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCart } from '@/app/providers/CartProvider';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { count } = useCart();
  const pathname = usePathname();

  const getBreadcrumbLabel = () => {
    if (pathname === '/' || pathname === '/products') {
      return 'Productos';
    }
    if (pathname === '/cart') {
      return 'Carrito';
    }
    if (pathname.startsWith('/products/')) {
      return title || 'Detalle del Producto';
    }
    return 'Inicio';
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-lg font-bold text-white">📱</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                MobileStore
              </span>
            </Link>
          </div>

          <nav className="text-sm text-gray-600">
            <Link
              href="/products"
              className="text-gray-900 hover:text-gray-700"
            >
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{getBreadcrumbLabel()}</span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              <span className="text-lg">🛒</span>
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
