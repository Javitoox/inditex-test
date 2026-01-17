/**
 * NOTA ARQUITECTÓNICA:
 * Este componente está implementado como SPA (Single Page Application) con renderizado
 * completamente en cliente ('use client') conforme a los requisitos de la prueba técnica.
 *
 * En una aplicación Next.js en PRODUCCIÓN, la mejor práctica sería:
 * - Usar renderizado en servidor (Server Components) para mejor performance y SEO
 * - Implementar SSG (Static Site Generation) para productos si son estáticos
 * - Usar Server Actions para operaciones de bases de datos
 *
 * Esta implementación CSR-only es válida para cumplir requisitos específicos de la prueba técnica,
 * pero reduciría performance en producción. Para casos reales, se recomienda Server Components.
 */

'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

import { Header } from '@/components/products/Header';
import { ProductActions } from '@/components/products/ProductActions';
import { ProductDescription } from '@/components/products/ProductDescription';
import { ProductImage } from '@/components/products/ProductImage';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import apiClient from '@/lib/services/apiClient';
import type { Product } from '@/lib/types/product';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getProductById(resolvedParams.id);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error al cargar el producto');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title="Detalles del Producto" />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <LoadingSpinner label="Cargando detalles..." />
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title="Detalles del Producto" />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error || 'Producto no encontrado'}
          </div>
          <Link
            href="/products"
            className="mt-4 inline-block text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
          >
            Volver a productos
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={`${product.brand} ${product.model}`} />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
          >
            ← Volver a productos
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <ProductImage
              src={product.imgUrl}
              alt={`${product.brand} ${product.model}`}
            />
          </div>

          <div className="space-y-6">
            <ProductDescription product={product} />
            <ProductActions product={product} />
          </div>
        </div>
      </main>
    </div>
  );
};

ProductDetailPage.displayName = 'ProductDetailPage';

export default ProductDetailPage;
