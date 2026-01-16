'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/lib/types/product';

interface ItemProps {
  product: Product;
}

export const Item = ({ product }: ItemProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg dark:border-gray-700">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {product.brand}
          </p>
          <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
            {product.model}
          </h3>
          <p className="mt-2 text-xl font-bold text-blue-600">
            ${product.price.toLocaleString('es-ES')}
          </p>
        </div>
      </div>
    </Link>
  );
};
