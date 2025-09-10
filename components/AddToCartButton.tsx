"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

interface AddToCartButtonProps {
  product: Product;
  customization?: {
    color?: string;
    size?: string;
    text?: string;
    image?: string;
  };
}

const AddToCartButton = ({ product, customization }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      customization,
    });

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 ">
      <div className="flex">
        <Button
          variant="outline"
          size="icon"
          onClick={decrementQuantity}
          disabled={quantity <= 1}
          className="rounded-r-none"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex items-center justify-center border-y px-4">
          <span className="w-8 text-center">{quantity}</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={incrementQuantity}
          className="rounded-l-none"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={handleAddToCart} className="flex-1">
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartButton;