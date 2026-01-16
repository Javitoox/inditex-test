'use client';

import { useEffect, useState } from 'react';

import { Header } from '@/components/products/Header';
import { Item } from '@/components/products/Item';
import { Search } from '@/components/products/Search';
import apiClient from '@/lib/services/apiClient';
import type { Product } from '@/lib/types/product';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.brand.toLowerCase().includes(query) ||
        product.model.toLowerCase().includes(query),
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Productos" />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Search value={searchQuery} onChange={setSearchQuery} />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin inline-block h-8 w-8 rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Cargando productos...
              </p>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? 'No se encontraron productos con esos criterios'
                    : 'No hay productos disponibles'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <Item key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

ProductsPage.displayName = 'ProductsPage';

export default ProductsPage;
