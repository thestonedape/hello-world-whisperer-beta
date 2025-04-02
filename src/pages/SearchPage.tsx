
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GiftCardItem from "@/components/ui/GiftCardItem";
import { GiftCard, searchGiftCards } from "@/lib/mockData";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  
  const [results, setResults] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchGiftCards(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">
          Search Results for "{query}"
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 rounded-md bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-md bg-gray-50 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold">No results found</h2>
            <p className="text-gray-600">
              We couldn't find any gift cards matching "{query}". Try another search term.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6">Found {results.length} gift cards matching your search.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((card) => (
                <GiftCardItem key={card.id} card={card} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
