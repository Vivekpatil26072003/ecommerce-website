import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16 items-center justify-between max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Fabric Fusion</h3>
            <p className="text-muted-foreground mb-4">
              Your one-stop shop for customizable clothing and accessories. Express yourself with our unique customization options.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">Products</Link>
              </li>
              <li>
                <Link href="/customize" className="text-muted-foreground hover:text-primary">Customize</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">A-123, Amardeep township, vadodara</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-muted-foreground" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-muted-foreground" />
                <span className="text-muted-foreground">support@fabricfusion.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FabricFusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;