"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/db';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Undo2, Upload } from 'lucide-react';

interface ProductCustomizerProps {
  product: Product;
}

const ProductCustomizer = ({ product }: ProductCustomizerProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customization, setCustomization] = useState({
    color: product.availableColors?.[0] || '',
    size: product.availableSizes?.[0] || '',
    text: '',
    image: '',
  });
  
  const [quantity, setQuantity] = useState(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleColorChange = (color: string) => {
    setCustomization(prev => ({ ...prev, color }));
  };

  const handleSizeChange = (size: string) => {
    setCustomization(prev => ({ ...prev, size }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomization(prev => ({ ...prev, text: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPreviewImage(imageUrl);
        setCustomization(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setCustomization({
      color: product.availableColors?.[0] || '',
      size: product.availableSizes?.[0] || '',
      text: '',
      image: '',
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
      description: `${quantity} × customized ${product.name} added to your cart`,
    });

    router.push('/cart');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
      {/* Preview Section */}
      <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center relative">
        <div className="relative w-full max-w-md aspect-square mb-6 ">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className="transition-all duration-300"
          />
          
          {/* Text Overlay */}
          {customization.text && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="px-4 py-2 text-center break-words max-w-[80%]"
                style={{ 
                  color: customization.color === 'white' || customization.color === 'yellow' ? 'black' : 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}
              >
                {customization.text}
              </div>
            </div>
          )}
          
          {/* Image Overlay */}
          {previewImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/3 relative">
                <Image
                  src={previewImage}
                  alt="Custom image"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          )}
          
          {/* Color Overlay */}
          {customization.color && (
            <div 
              className="absolute inset-0 mix-blend-multiply"
              style={{ 
                backgroundColor: customization.color,
                opacity: 0.3
              }}
            />
          )}
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-lg font-medium text-primary">${product.price.toFixed(2)}</p>
          
          {customization.size && (
            <p className="mt-2 text-muted-foreground">Size: {customization.size}</p>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-4 right-4"
          onClick={handleReset}
        >
          <Undo2 className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
      
      {/* Customization Options */}
      <div>
        <Tabs defaultValue="options" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="text" disabled={!product.allowTextCustomization}>Text</TabsTrigger>
            <TabsTrigger value="image" disabled={!product.allowImageUpload}>Image</TabsTrigger>
          </TabsList>
          
          <TabsContent value="options" className="space-y-6 pt-4">
            {/* Color Selection */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-3">
                  {product.availableColors.map(color => (
                    <button
                      key={color}
                      className={`h-10 w-10 rounded-full border-2 transition-all ${
                        customization.color === color ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-muted'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="space-y-2">
                <Label>Size</Label>
                <RadioGroup 
                  value={customization.size} 
                  onValueChange={handleSizeChange}
                  className="flex flex-wrap gap-2"
                >
                  {product.availableSizes.map(size => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-muted bg-background text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="custom-text">Add Custom Text</Label>
              <Textarea
                id="custom-text"
                placeholder="Enter your text here..."
                value={customization.text}
                onChange={handleTextChange}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Add your custom message, name, or quote to be printed on the product.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="custom-image">Upload Custom Image</Label>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" /> Choose Image
                </Button>
                <Input
                  id="custom-image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              {previewImage && (
                <div className="mt-4 relative h-40 w-40 mx-auto border rounded-md overflow-hidden">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Upload a PNG or JPG image to be printed on the product. For best results, use a transparent PNG.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <Button onClick={handleAddToCart} size="lg" className="w-full">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;