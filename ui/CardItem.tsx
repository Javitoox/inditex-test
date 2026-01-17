'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CardItemProps {
  href: string;
  image: {
    src: string;
    alt: string;
  };
  subtitle?: string;
  title: string;
  price?: number;
  priceFormatter?: (price: number) => string;
}

export const CardItem = ({
  href,
  image,
  subtitle,
  title,
  price,
  priceFormatter = (p) => p.toLocaleString('es-ES'),
}: CardItemProps) => {
  return (
    <Link href={href}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg dark:border-gray-700">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-4">
          {subtitle && (
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {price !== undefined && (
            <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
              {priceFormatter(price)}€
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

interface ItemProps {
  product: {
    id: string | number;
    imgUrl: string;
    brand: string;
    model: string;
    price: number;
  };
}

export const Item = ({ product }: ItemProps) => {
  return (
    <CardItem
      href={`/products/${product.id}`}
      image={{
        src: product.imgUrl,
        alt: `${product.brand} ${product.model}`,
      }}
      subtitle={product.brand}
      title={product.model}
      price={product.price}
    />
  );
};
