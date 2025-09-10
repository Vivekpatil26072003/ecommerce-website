"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Package, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/lib/db';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/orders');
      return;
    }

    // Simulate fetching orders from API
    const fetchOrders = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock orders data
      const mockOrders: Order[] = [
        {
          id: '1',
          userId: user.id,
          items: [
            {
              productId: '1',
              name: 'Classic T-Shirt',
              price: 24.99,
              quantity: 2,
              customization: {
                color: 'blue',
                size: 'M',
                text: 'Hello World',
              },
            },
            {
              productId: '3',
              name: 'Graphic Hoodie',
              price: 39.99,
              quantity: 1,
            },
          ],
          total: 89.97,
          status: 'delivered',
          createdAt: '2023-04-15T10:30:00Z',
          shippingAddress: {
            name: user.name,
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
        },
        {
          id: '2',
          userId: user.id,
          items: [
            {
              productId: '6',
              name: 'Denim Jacket',
              price: 59.99,
              quantity: 1,
              customization: {
                color: 'blue',
                size: 'L',
                image: 'custom-image.jpg',
              },
            },
          ],
          total: 59.99,
          status: 'shipped',
          createdAt: '2023-05-20T14:45:00Z',
          shippingAddress: {
            name: user.name,
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
        },
        {
          id: '3',
          userId: user.id,
          items: [
            {
              productId: '4',
              name: 'Summer Dress',
              price: 34.99,
              quantity: 1,
            },
            {
              productId: '7',
              name: 'Polo Shirt',
              price: 34.99,
              quantity: 1,
              customization: {
                color: 'red',
                size: 'M',
                text: 'Custom Text',
              },
            },
          ],
          total: 69.98,
          status: 'processing',
          createdAt: '2023-06-05T09:15:00Z',
          shippingAddress: {
            name: user.name,
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
        },
      ];
      
      setOrders(mockOrders);
      setIsLoading(false);
    };

    fetchOrders();
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <OrdersList orders={orders} getStatusColor={getStatusColor} />
        </TabsContent>
        
        <TabsContent value="processing">
          <OrdersList 
            orders={orders.filter(order => order.status === 'pending' || order.status === 'processing')} 
            getStatusColor={getStatusColor} 
          />
        </TabsContent>
        
        <TabsContent value="shipped">
          <OrdersList 
            orders={orders.filter(order => order.status === 'shipped')} 
            getStatusColor={getStatusColor} 
          />
        </TabsContent>
        
        <TabsContent value="delivered">
          <OrdersList 
            orders={orders.filter(order => order.status === 'delivered')} 
            getStatusColor={getStatusColor} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface OrdersListProps {
  orders: Order[];
  getStatusColor: (status: Order['status']) => string;
}

function OrdersList({ orders, getStatusColor }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No orders found</h3>
        <p className="text-muted-foreground">There are no orders in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Order #{order.id}</h3>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/orders/${order.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    {item.customization && (
                      <p className="text-xs text-muted-foreground">Customized</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}