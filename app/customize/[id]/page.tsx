import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ProductCustomizer from '@/components/ProductCustomizer';

interface CustomizeProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const products = await db.getCustomizableProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

async function getProduct(id: string) {
  const product = await db.getProductById(id);
  
  if (!product || !product.isCustomizable) {
    return null;
  }
  
  return product;
}

export default async function CustomizeProductPage({ params }: CustomizeProductPageProps) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Customize {product.name}</h1>
      <ProductCustomizer product={product} />
    </div>
  );
}