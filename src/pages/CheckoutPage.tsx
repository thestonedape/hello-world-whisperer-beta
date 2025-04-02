
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const CheckoutPage: React.FC = () => {
  const { items, getTotal, getTotalDiscount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CheckoutFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const subtotal = getTotal();
  const savings = getTotalDiscount();
  const total = subtotal - savings;

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to checkout",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create order with mock API
      await createOrder(user.id, items, total);
      
      // Show success message
      toast({
        title: "Order Successful!",
        description: "Your gift cards will be emailed to you shortly.",
      });
      
      // Clear cart and redirect to dashboard
      clearCart();
      navigate("/dashboard");
    } catch (error) {
      console.error("Checkout failed:", error);
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-xl font-semibold">Your Information</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="you@example.com" 
                                required 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-6 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full" size="lg">
                        Complete Purchase
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                
                <div className="mb-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.brand} (${item.amount})
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
