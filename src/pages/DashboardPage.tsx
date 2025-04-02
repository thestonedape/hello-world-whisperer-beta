
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { getOrderHistory, Order } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        const data = await getOrderHistory(user.id);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleResendEmail = (orderId: string) => {
    // Mock email resend functionality
    toast({
      title: "Email Sent",
      description: "Your gift card has been resent to your email address.",
    });
  };

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=dashboard" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">My Dashboard</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* User Profile */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order History */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Your past gift card purchases</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 rounded-md bg-gray-200 animate-pulse"></div>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="rounded-md bg-gray-50 p-6 text-center">
                    <p className="text-gray-600">You haven't purchased any gift cards yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="rounded-md border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p className={`text-sm ${
                              order.status === "completed" 
                                ? "text-green-600" 
                                : order.status === "processing" 
                                ? "text-orange-600" 
                                : "text-red-600"
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </p>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <p>
                                {item.brand} (${item.amount})
                              </p>
                              <p>${item.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResendEmail(order.id)}
                          >
                            Resend Email
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
