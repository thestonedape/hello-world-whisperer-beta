
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiftCard, getFeaturedGiftCards } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import GiftCardItem from "@/components/ui/GiftCardItem";

const FeaturedSection: React.FC = () => {
  const [featuredCards, setFeaturedCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCards = async () => {
      try {
        const cards = await getFeaturedGiftCards();
        setFeaturedCards(cards);
      } catch (error) {
        console.error("Failed to fetch featured cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCards();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="mb-6 text-2xl font-bold">Featured Offers</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-72 rounded-md bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Offers</h2>
        <Link to="/featured">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredCards.map((card) => (
          <GiftCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
