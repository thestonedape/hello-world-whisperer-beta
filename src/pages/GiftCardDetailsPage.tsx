
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { getGiftCardById, GiftCard } from "@/lib/mockData";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const GiftCardDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [card, setCard] = useState<GiftCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) return;
      
      try {
        const data = await getGiftCardById(id);
        setCard(data);
        // Set first denomination as default selection
        if (data && data.denominations.length > 0) {
          setSelectedAmount(data.denominations[0]);
        }
      } catch (error) {
        console.error("Failed to fetch gift card:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleAddToCart = () => {
    if (!card || !selectedAmount) return;
    
    const discountedPrice = selectedAmount - (selectedAmount * card.discount / 100);
    
    const cartItem: CartItem = {
      id: card.id,
      brand: card.brand,
      amount: selectedAmount,
      price: discountedPrice,
      discount: card.discount,
      image: card.image,
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to cart",
      description: `${card.brand} $${selectedAmount} gift card added to your cart.`,
    });
    
    navigate("/cart");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="h-64 w-full rounded-md bg-gray-200 animate-pulse md:w-1/2"></div>
            <div className="flex w-full flex-col gap-4 md:w-1/2">
              <div className="h-8 w-3/4 rounded-md bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-1/2 rounded-md bg-gray-200 animate-pulse"></div>
              <div className="h-24 w-full rounded-md bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!card) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-md bg-red-50 p-4 text-red-600">
            Gift card not found. Please try another one.
          </div>
        </div>
      </Layout>
    );
  }

  const { brand, description, image, discount, terms, denominations } = card;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Column - Image */}
          <div className="md:w-1/2">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`${brand} Gift Card`}
                className="h-auto w-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute right-2 top-2 rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white">
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="md:w-1/2">
            <h1 className="mb-2 text-3xl font-bold">{brand} Gift Card</h1>
            
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-600">
                Save {discount}% on every purchase
              </span>
            </div>
            
            <p className="mb-6 text-gray-600">{description}</p>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold">Select Amount</h2>
              <RadioGroup
                value={selectedAmount?.toString()}
                onValueChange={(value) => setSelectedAmount(Number(value))}
              >
                <div className="grid grid-cols-2 gap-4">
                  {denominations.map((amount) => {
                    const discountedAmount = amount - (amount * discount / 100);
                    return (
                      <div key={amount} className="flex items-center space-x-2">
                        <RadioGroupItem value={amount.toString()} id={`amount-${amount}`} />
                        <Label htmlFor={`amount-${amount}`} className="flex flex-col">
                          <span className="font-semibold">${amount}</span>
                          <span className="text-sm text-green-600">
                            Pay ${discountedAmount.toFixed(2)}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>
            
            <Button
              className="mb-6 w-full py-6 text-lg"
              onClick={handleAddToCart}
              disabled={!selectedAmount}
            >
              Add to Cart
            </Button>
            
            <div>
              <h2 className="mb-2 text-lg font-semibold">Terms and Conditions</h2>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                {terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GiftCardDetailsPage;
