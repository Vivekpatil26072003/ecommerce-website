"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/db';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const images = product.images || [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4  ">
      <div className="relative aspect-square overflow-hidden rounded-lg border ">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="transition-all duration-300"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border",
                selectedImage === image && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;