import { render, screen } from '@testing-library/react';
import { Header } from '@/components/products/Header';
import { useCart } from '@/app/providers/CartProvider';
import { usePathname } from 'next/navigation';

jest.mock('@/app/providers/CartProvider', () => ({
  useCart: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ count: 0 });
    (usePathname as jest.Mock).mockReturnValue('/products');
  });

  it('should render the logo and store name', () => {
    render(<Header />);

    expect(screen.getByText('MobileStore')).toBeInTheDocument();
    expect(screen.getByText('📱')).toBeInTheDocument();
  });

  it('should show the breadcrumb when not on home and has a title', () => {
    (usePathname as jest.Mock).mockReturnValue('/products/123');

    render(<Header title="Detalles del Producto" />);

    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Detalles del Producto')).toBeInTheDocument();
  });

  it('should not show the breadcrumb on the home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/products');

    render(<Header title="Productos" />);

    expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
  });

  it('should show the cart link', () => {
    render(<Header />);

    const cartLink = screen.getByRole('link', { name: /🛒/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('should show the cart count when there are products', () => {
    (useCart as jest.Mock).mockReturnValue({ count: 3 });

    render(<Header />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
