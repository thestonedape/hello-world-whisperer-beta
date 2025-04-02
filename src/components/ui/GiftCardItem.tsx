
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type GiftCard } from "@/lib/mockData";

interface GiftCardItemProps {
  card: GiftCard;
}

const GiftCardItem: React.FC<GiftCardItemProps> = ({ card }) => {
  const { id, brand, image, discount, price } = card;
  const discountedPrice = price - (price * discount / 100);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={`${brand} Gift Card`} 
            className="h-48 w-full object-cover"
          />
          {discount > 0 && (
            <div className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
              {discount}% OFF
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold">{brand}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-semibold text-green-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/gift-card/${id}`} className="w-full">
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GiftCardItem;
