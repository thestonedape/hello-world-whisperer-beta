
import React from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mockData";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-2 pb-2">
        <Button
          variant={selectedCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory("All")}
          className="whitespace-nowrap"
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
