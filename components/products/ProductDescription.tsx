'use client';

import type { Product } from '@/lib/types/product';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const specs = [
    { label: 'Marca', value: product.brand },
    { label: 'Modelo', value: product.model },
    { label: 'Precio', value: `${product.price.toLocaleString('es-ES')}€` },
    { label: 'CPU', value: product.cpu },
    { label: 'RAM', value: product.ram },
    { label: 'Sistema Operativo', value: product.os },
    { label: 'Resolución de pantalla', value: product.screenResolution },
    { label: 'Batería', value: product.battery },
    { label: 'Cámaras', value: product.cameras },
    { label: 'Dimensiones', value: product.dimensions },
    { label: 'Peso', value: product.weight },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {product.brand} {product.model}
        </h1>
        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          {product.price.toLocaleString('es-ES')}€
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          Especificaciones
        </h2>
        <div className="space-y-2">
          {specs.map((spec) => (
            <div key={spec.label} className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                {spec.label}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
