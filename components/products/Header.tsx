'use client';

import { usePathname } from 'next/navigation';
import { useCart } from '@/app/providers/CartProvider';
import { PageHeader } from '@/ui/PageHeader';

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
    <PageHeader
      homeHref="/"
      homeLabel="Inicio"
      appName="MobileStore"
      appIcon="📱"
      breadcrumbLabel={getBreadcrumbLabel()}
      cartHref="/cart"
      cartCount={count}
      cartIcon="🛒"
    />
  );
};
