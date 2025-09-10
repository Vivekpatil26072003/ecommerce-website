import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="container py-12 items-center justify-between max-w-full">
      {/* Hero Section */}
      <div className="relative h-[40vh] rounded-lg overflow-hidden mb-16">
        <Image
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="About Fabric Fusion"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Fabric Fusion</h1>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
          Fabric Fusion was founded in 2023 with a simple mission: to empower people to express their unique style through customizable clothing and accessories.
          </p>
          <p className="text-muted-foreground mb-4">
            What started as a small passion project has grown into a thriving e-commerce platform that serves customers worldwide. We believe that fashion should be personal, and that everyone deserves the opportunity to wear clothing that truly represents who they are.
          </p>
          <p className="text-muted-foreground">
            Our team of designers and fashion enthusiasts work tirelessly to create high-quality base products that serve as the perfect canvas for your creativity. Whether you are adding a simple monogram or uploading a complex design, we are here to help you bring your vision to life.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Our story"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality",
              description: "We never compromise on quality. Every product we offer is made from premium materials and built to last.",
              icon: "🌟",
            },
            {
              title: "Creativity",
              description: "We believe in the power of self-expression and provide the tools you need to create clothing that's uniquely yours.",
              icon: "🎨",
            },
            {
              title: "Sustainability",
              description: "We're committed to reducing our environmental impact through responsible sourcing and eco-friendly practices.",
              icon: "🌱",
            },
          ].map((value, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Process */}
      <div className="mb-16 bg-muted p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: "Design",
              description: "Our designers create high-quality base products that serve as the perfect canvas for customization.",
            },
            {
              step: 2,
              title: "Customize",
              description: "Customers use our intuitive tools to add colors, text, and images to make the product their own.",
            },
            {
              step: 3,
              title: "Produce",
              description: "Our skilled production team carefully crafts each custom item to ensure quality and accuracy.",
            },
            {
              step: 4,
              title: "Deliver",
              description: "We ship your custom creation directly to your door, ready to wear and enjoy.",
            },
          ].map((process, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl mb-4">
                {process.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
              <p className="text-muted-foreground">{process.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Express Your Style?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have already discovered the joy of wearing truly personalized clothing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/customize">Start Customizing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}