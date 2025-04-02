
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import FeaturedSection from "@/components/home/FeaturedSection";
import CategoryFilter from "@/components/home/CategoryFilter";
import GiftCardItem from "@/components/ui/GiftCardItem";
import { 
  GiftCard, 
  getAllGiftCards, 
  filterGiftCardsByCategory
} from "@/lib/mockData";

const HomePage: React.FC = () => {
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const data = await (selectedCategory === "All" 
          ? getAllGiftCards()
          : filterGiftCardsByCategory(selectedCategory)
        );
        setCards(data);
      } catch (error) {
        console.error("Failed to fetch gift cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              Save on Your Favorite Brands
            </h1>
            <p className="mb-6 text-lg">
              Discover discounted gift cards for top brands. Save up to 10% on your purchases!
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#browse" className="rounded-md bg-white px-6 py-2 text-purple-600 transition hover:bg-gray-100">
                Browse Cards
              </a>
              <a href="#featured" className="rounded-md border border-white px-6 py-2 text-white transition hover:bg-white/10">
                Featured Deals
              </a>
            </div>
          </div>
        </section>

        <section id="featured" className="mb-12">
          <FeaturedSection />
        </section>

        <section id="browse">
          <h2 className="mb-6 text-2xl font-bold">Browse Gift Cards</h2>
          
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={handleCategorySelect} 
          />
          
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-72 rounded-md bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {cards.length === 0 ? (
                <div className="rounded-md bg-gray-100 p-8 text-center">
                  <p className="text-lg text-gray-600">No gift cards found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {cards.map((card) => (
                    <GiftCardItem key={card.id} card={card} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
