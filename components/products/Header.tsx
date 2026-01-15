'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCart } from '@/app/providers/CartProvider';

interface HeaderProps {
  title?: string;
  showBreadcrumb?: boolean;
}

export const Header = ({ title, showBreadcrumb = true }: HeaderProps) => {
  const { count } = useCart();
  const pathname = usePathname();

  const isHome = pathname === '/products' || pathname === '/';

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-lg font-bold text-white">📱</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MobileStore
              </span>
            </Link>
          </div>

          {showBreadcrumb && !isHome && title && (
            <nav className="text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-white">{title}</span>
            </nav>
          )}

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
