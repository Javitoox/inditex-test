'use client';

import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage = ({ src, alt }: ProductImageProps) => {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};
