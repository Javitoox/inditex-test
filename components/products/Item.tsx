'use client';

import { CardItem } from '@/ui/CardItem';
import type { Product } from '@/lib/types/product';

interface ItemProps {
  product: Product;
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
