'use client';

import Link from 'next/link';

interface PageHeaderProps {
  homeHref?: string;
  homeLabel?: string;
  appName: string;
  appIcon: string;
  breadcrumbLabel: string;
  cartHref?: string;
  cartCount?: number;
  cartIcon?: string;
  onBreadcrumbChange?: (label: string) => void;
}

export const PageHeader = ({
  homeHref = '/',
  homeLabel = 'Inicio',
  appName,
  appIcon,
  breadcrumbLabel,
  cartHref,
  cartCount,
  cartIcon = '🛒',
}: PageHeaderProps) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={homeHref} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-lg font-bold text-white">{appIcon}</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{appName}</span>
            </Link>
          </div>

          <nav className="text-sm text-gray-600">
            <Link href={homeHref} className="text-gray-900 hover:text-gray-700">
              {homeLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{breadcrumbLabel}</span>
          </nav>

          {cartHref && (
            <div className="flex items-center gap-2">
              <Link
                href={cartHref}
                className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span className="text-lg">{cartIcon}</span>
                {typeof cartCount === 'number' && cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
