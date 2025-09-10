import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, image, isCustomizable } = product;

  return (
    <Card className="overflow-hidden h-full flex flex-col ">
      <div className="relative aspect-square ">
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform hover:scale-105 "
        />
        {isCustomizable && (
          <Badge className="absolute top-2 right-2 bg-primary">Customizable</Badge>
        )}
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-medium text-lg truncate">{name}</h3>
        <p className="text-primary font-semibold mt-1">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4 flex gap-2">
        <Button asChild variant="default" className="flex-1">
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
        {isCustomizable && (
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/customize/${id}`}>Customize</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;