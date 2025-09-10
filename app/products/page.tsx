import { Suspense } from 'react';
import { db } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

async function getProducts() {
  const products = await db.getProducts();
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  return {
    products,
    categories,
  };
}

export default async function ProductsPage() {
  const { products, categories } = await getProducts();

  return (
    <div className="container py-12 items-center justify-between max-w-full">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Products</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={<ProductsGridSkeleton />}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Suspense fallback={<ProductsGridSkeleton />}>
                {products
                  .filter(product => product.category === category)
                  .map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </Suspense>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </>
  );
}