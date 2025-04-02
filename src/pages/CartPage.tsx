
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { TrashIcon } from "lucide-react";

const CartPage: React.FC = () => {
  const { items, removeFromCart, getTotal, getTotalDiscount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  const subtotal = getTotal();
  const savings = getTotalDiscount();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <h2 className="mb-4 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-6 text-gray-600">
              Looks like you haven't added any gift cards to your cart yet.
            </p>
            <Link to="/">
              <Button>Browse Gift Cards</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.brand}
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.brand}</h3>
                          <p className="text-sm text-gray-600">
                            ${item.amount} Gift Card
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-green-600">
                            {item.discount}% off
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.brand} gift card from cart`}
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                  
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
                      <span>${(subtotal - savings).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="mt-6 w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">
                      Continue Shopping
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
