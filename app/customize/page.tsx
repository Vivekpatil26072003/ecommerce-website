import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

async function getCustomizableProducts() {
  return db.getCustomizableProducts();
}

export default async function CustomizePage() {
  const customizableProducts = await getCustomizableProducts();

  return (
    <div className="container py-12 items-center justify-between max-w-full">
      <div className="max-w-3xl mx-auto text-center mb-12 ">
        <h1 className="text-4xl font-bold mb-4">Customize Your Style</h1>
        <p className="text-lg text-muted-foreground">
          Express your unique personality with our customization options. Choose from a variety of products and make them truly yours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Choose Colors</h3>
            <p className="text-muted-foreground">
              Select from a wide range of colors to match your style and preferences.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">✏️</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Add Text</h3>
            <p className="text-muted-foreground">
              Add your own text, quotes, or messages to personalize your items.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🖼️</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Upload Images</h3>
            <p className="text-muted-foreground">
              Upload your own images or artwork to create truly unique products.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Select a Product to Customize</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customizableProducts.map((product) => (
          <div key={product.id} className="group relative overflow-hidden rounded-lg border">
            <div className="aspect-square relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button asChild>
                  <Link href={`/customize/${product.id}`}>Customize Now</Link>
                </Button>
              </div>
            </div>
            <div className="p-4 bg-background">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-primary font-semibold mt-1">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-muted rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">1</div>
              <h3 className="font-medium mb-2">Choose a Product</h3>
              <p className="text-muted-foreground text-center">
                Browse our collection and select the item you want to customize.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">2</div>
              <h3 className="font-medium mb-2">Personalize It</h3>
              <p className="text-muted-foreground text-center">
                Add your colors, text, and images to make it uniquely yours.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">3</div>
              <h3 className="font-medium mb-2">Order & Enjoy</h3>
              <p className="text-muted-foreground text-center">
                Preview your creation, add to cart, and we'll deliver it to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}