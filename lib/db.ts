// This is a mock database service for demonstration purposes
// In a real application, you would connect to a real database like Supabase, MongoDB, etc.

import { CustomizationOptions } from '@/context/CartContext';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  isCustomizable: boolean;
  availableColors?: string[];
  availableSizes?: string[];
  allowTextCustomization?: boolean;
  allowImageUpload?: boolean;
};

export type Order = {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    customization?: CustomizationOptions;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

// Mock products data
const products: Product[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    description: 'A comfortable and versatile t-shirt made from 100% cotton. Perfect for everyday wear.',
    price: 24.99,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    isCustomizable: true,
    availableColors: ['white', 'black', 'gray', 'blue', 'red'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    allowTextCustomization: true,
    allowImageUpload: true,
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a comfortable stretch. Versatile and stylish for any occasion.',
    price: 49.99,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isCustomizable: false,
    availableSizes: ['28', '30', '32', '34', '36', '38'],
  },
  {
    id: '3',
    name: 'Graphic Hoodie',
    description: 'A warm and stylish hoodie with a modern graphic design. Perfect for cooler weather.',
    price: 39.99,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    isCustomizable: true,
    availableColors: ['black', 'gray', 'navy', 'maroon'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    allowTextCustomization: true,
    allowImageUpload: true,
  },
  {
    id: '4',
    name: 'Summer Dress',
    description: 'A light and flowy summer dress perfect for warm days. Made from breathable fabric.',
    price: 34.99,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isCustomizable: true,
    availableColors: ['white', 'blue', 'floral', 'pink'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    allowTextCustomization: false,
    allowImageUpload: false,
  },
  {
    id: '5',
    name: 'Athletic Shorts',
    description: 'Lightweight and breathable athletic shorts. Perfect for workouts or casual wear.',
    price: 29.99,
    category: 'Shorts',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isCustomizable: false,
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '6',
    name: 'Denim Jacket',
    description: 'A classic denim jacket that never goes out of style. Durable and versatile.',
    price: 59.99,
    category: 'Jackets',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isCustomizable: true,
    availableColors: ['blue', 'black', 'light wash'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    allowTextCustomization: true,
    allowImageUpload: true,
  },
  {
    id: '7',
    name: 'Polo Shirt',
    description: 'A classic polo shirt made from premium cotton. Perfect for casual and semi-formal occasions.',
    price: 34.99,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isCustomizable: true,
    availableColors: ['white', 'black', 'navy', 'green', 'red'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    allowTextCustomization: true,
    allowImageUpload: false,
  },
  {
    id: '8',
    name: 'Winter Coat',
    description: 'A warm and stylish winter coat. Perfect for cold weather and snow.',
    price: 89.99,
    category: 'Jackets',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isCustomizable: false,
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
];

// Mock orders data
const orders: Order[] = [];

// Database service
export const db = {
  // Product methods
  getProducts: async () => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 0));
    return products;
  },
  
  getProductById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 0));
    return products.find(product => product.id === id) || null;
  },
  
  getProductsByCategory: async (category: string) => {
    await new Promise(resolve => setTimeout(resolve, 0));
    return products.filter(product => product.category === category);
  },
  
  getCustomizableProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    return products.filter(product => product.isCustomizable);
  },
  
  searchProducts: async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 0));
    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  // Order methods
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    return Promise.resolve(newOrder);
  },
  
  getOrdersByUserId: (userId: string) => 
    Promise.resolve(orders.filter(order => order.userId === userId)),
  
  getOrderById: (id: string) => 
    Promise.resolve(orders.find(order => order.id === id) || null),
  
  updateOrderStatus: (id: string, status: Order['status']) => {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      return Promise.resolve(orders[orderIndex]);
    }
    return Promise.reject(new Error('Order not found'));
  },
};