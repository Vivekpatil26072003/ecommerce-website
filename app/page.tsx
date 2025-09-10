import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import ProductCard from '@/components/ProductCard';

async function getHomePageData() {
  const featuredProducts = await db.getProducts();
  return {
    featuredProducts: featuredProducts.slice(0, 4),
    customizableProducts: featuredProducts.filter(p => p.isCustomizable).slice(0, 3),
  };
}

export default async function Home() {
  const { featuredProducts, customizableProducts } = await getHomePageData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-70 flex items-center ">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Express Your Style</h1>
            <p className="text-lg md:text-xl mb-8">
              Discover unique clothing and accessories that you can customize to match your personal style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Link href="/customize">Customize</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background ">
        <div className="container items-center justify-between max-w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-16 bg-muted">
        <div className="container items-center justify-between max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Design Your Own</h2>
              <p className="text-lg mb-6">
                Express your unique style with our customization options. Choose colors, add text, upload images, and more to create clothing that's truly yours.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">✓</span>
                  <span>Choose from multiple colors and sizes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">✓</span>
                  <span>Add custom text and messages</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">✓</span>
                  <span>Upload your own images and designs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">✓</span>
                  <span>Preview your creation before ordering</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link href="/customize">Start Designing</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {customizableProducts.map((product) => (
                <div key={product.id} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button asChild variant="secondary">
                      <Link href={`/customize/${product.id}`}>Customize</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container items-center justify-between max-w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                text: 'I love my custom t-shirt! The quality is excellent and the customization options are amazing. Will definitely order again.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
              },
              {
                name: 'Michael Chen',
                text: 'The customization process was so easy and fun. I created a hoodie with my own design and it turned out perfect. Great service!',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
              },
              {
                name: 'Emily Rodriguez',
                text: 'StyleHub has the best quality custom clothing I\'ve found. The colors are vibrant and the printing is crisp. Highly recommend!',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex text-yellow-500">
                      {'★★★★★'}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container items-center justify-between max-w-full">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-6">
              Subscribe to get updates on new products, special offers, and customization tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-foreground"
                required
              />
              <Button type="submit" variant="secondary" size="lg">
                Subscribe
              </Button>

              
            </form>
          </div>
        </div>
        
      </section>
    </div>
  );
}

