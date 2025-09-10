import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/AddToCartButton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const products = await db.getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

async function getProduct(id: string) {
  const product = await db.getProductById(id);
  
  if (!product) {
    return null;
  }
  
  // Get related products from the same category
  const relatedProducts = await db.getProductsByCategory(product.category);
  
  return {
    product,
    relatedProducts: relatedProducts.filter(p => p.id !== id).slice(0, 4),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const data = await getProduct(params.id);
  
  if (!data) {
    notFound();
  }
  
  const { product, relatedProducts } = data;
  
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductGallery product={product} />
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mt-2">${product.price.toFixed(2)}</p>
          
          <div className="mt-6">
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          {product.availableSizes && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(size => (
                  <div key={size} className="border rounded-md px-3 py-1 text-sm">
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {product.availableColors && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map(color => (
                  <div 
                    key={color} 
                    className="h-8 w-8 rounded-full border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} />
            
            {product.isCustomizable && (
              <Button asChild variant="outline">
                <Link href={`/customize/${product.id}`}>Customize This Item</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Separator className="my-12" />
      
      {/* Product Information Tabs */}
      <Tabs defaultValue="details" className="mt-12">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <div className="prose max-w-none">
            <h3>Product Details</h3>
            <p>{product.description}</p>
            <ul>
              <li>High-quality materials</li>
              <li>Comfortable fit</li>
              <li>Durable construction</li>
              <li>Easy care instructions</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <div className="prose max-w-none">
            <h3>Shipping Information</h3>
            <p>We offer the following shipping options:</p>
            <ul>
              <li>Standard Shipping (3-5 business days): $5.99</li>
              <li>Express Shipping (1-2 business days): $12.99</li>
              <li>Free shipping on orders over $50</li>
            </ul>
            
            <h3>Return Policy</h3>
            <p>We accept returns within 30 days of delivery. Items must be in original condition with tags attached.</p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">4.8</div>
              <div>
                <div className="flex text-yellow-500">{'★★★★★'}</div>
                <p className="text-sm text-muted-foreground">Based on 24 reviews</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: 'Alex Thompson',
                  rating: 5,
                  date: '2 weeks ago',
                  comment: 'Great product! The quality is excellent and it fits perfectly. Would definitely recommend.',
                },
                {
                  name: 'Jamie Wilson',
                  rating: 4,
                  date: '1 month ago',
                  comment: 'Really nice item. The material is good quality and the color is exactly as shown in the pictures.',
                },
                {
                  name: 'Taylor Reed',
                  rating: 5,
                  date: '2 months ago',
                  comment: 'Love it! Fast shipping and the product exceeded my expectations. Will be ordering more.',
                },
              ].map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{review.name}</h4>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex text-yellow-500 mb-2">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}