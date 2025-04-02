
// Mock data for gift cards

export type GiftCard = {
  id: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  discount: number; // Percentage discount
  price: number;
  denominations: number[]; // Available amounts
  terms: string[];
  featured: boolean;
};

export const categories = [
  "Retail",
  "Food & Drink",
  "Entertainment",
  "Travel",
  "Electronics",
  "Home Goods",
  "Fashion",
];

export const giftCards: GiftCard[] = [
  {
    id: "amazon-1",
    brand: "Amazon",
    category: "Retail",
    description: "Shop for anything with Amazon gift cards. Valid for all products on Amazon.com.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Amazon",
    discount: 7.5,
    price: 100,
    denominations: [25, 50, 100, 200],
    terms: [
      "Valid for products sold by Amazon.com and digital content.",
      "Cannot be used for other gift cards or pre-paid cards.",
      "No expiration date or fees.",
    ],
    featured: true,
  },
  {
    id: "netflix-1",
    brand: "Netflix",
    category: "Entertainment",
    description: "Stream your favorite shows and movies with Netflix gift cards.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Netflix",
    discount: 10,
    price: 50,
    denominations: [25, 50, 100],
    terms: [
      "Redeem on Netflix.com for subscription services.",
      "Cannot be exchanged for cash.",
      "No expiration date.",
    ],
    featured: true,
  },
  {
    id: "starbucks-1",
    brand: "Starbucks",
    category: "Food & Drink",
    description: "Enjoy coffee, food, and more at any Starbucks location.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Starbucks",
    discount: 8,
    price: 25,
    denominations: [10, 25, 50, 100],
    terms: [
      "Valid at participating Starbucks stores.",
      "Can be added to Starbucks app.",
      "No expiration date or fees.",
    ],
    featured: false,
  },
  {
    id: "target-1",
    brand: "Target",
    category: "Retail",
    description: "Shop for everything from groceries to clothing at Target.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Target",
    discount: 5,
    price: 50,
    denominations: [25, 50, 100],
    terms: [
      "Valid at all Target locations and Target.com.",
      "Cannot be returned or exchanged for cash.",
      "No expiration date.",
    ],
    featured: false,
  },
  {
    id: "apple-1",
    brand: "Apple",
    category: "Electronics",
    description: "Purchase apps, games, music, movies, and more from Apple.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Apple",
    discount: 5,
    price: 100,
    denominations: [25, 50, 100, 200],
    terms: [
      "Valid for iTunes, App Store, iBooks, and Apple Music.",
      "Cannot be redeemed for cash or refunded.",
      "No expiration date.",
    ],
    featured: true,
  },
  {
    id: "uber-1",
    brand: "Uber",
    category: "Travel",
    description: "Get rides or order food with Uber gift cards.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Uber",
    discount: 7,
    price: 25,
    denominations: [25, 50, 100],
    terms: [
      "Valid for Uber rides and Uber Eats.",
      "Cannot be exchanged for cash or credit.",
      "No expiration date.",
    ],
    featured: false,
  },
  {
    id: "bestbuy-1",
    brand: "Best Buy",
    category: "Electronics",
    description: "Shop for electronics, appliances, and more at Best Buy.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Best+Buy",
    discount: 6,
    price: 50,
    denominations: [25, 50, 100, 200],
    terms: [
      "Valid at all Best Buy locations and BestBuy.com.",
      "Cannot be exchanged for cash.",
      "No expiration date.",
    ],
    featured: false,
  },
  {
    id: "walmart-1",
    brand: "Walmart",
    category: "Retail",
    description: "Shop for groceries, electronics, and more at Walmart.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Walmart",
    discount: 4.5,
    price: 100,
    denominations: [25, 50, 100, 200],
    terms: [
      "Valid at all Walmart locations and Walmart.com.",
      "Cannot be exchanged for cash except where required by law.",
      "No expiration date.",
    ],
    featured: false,
  },
  {
    id: "airbnb-1",
    brand: "Airbnb",
    category: "Travel",
    description: "Book accommodations worldwide with Airbnb gift cards.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Airbnb",
    discount: 6,
    price: 100,
    denominations: [50, 100, 200, 500],
    terms: [
      "Valid for all bookings on Airbnb.",
      "Cannot be exchanged for cash.",
      "No expiration date.",
    ],
    featured: true,
  },
  {
    id: "doordash-1",
    brand: "DoorDash",
    category: "Food & Drink",
    description: "Order food delivery from your favorite restaurants.",
    image: "https://placehold.co/400x300/EEE/31343C?text=DoorDash",
    discount: 8,
    price: 50,
    denominations: [25, 50, 100],
    terms: [
      "Valid for orders on the DoorDash app or website.",
      "Cannot be exchanged for cash.",
      "No expiration date.",
    ],
    featured: false,
  },
  {
    id: "sephora-1",
    brand: "Sephora",
    category: "Fashion",
    description: "Shop for beauty products at Sephora.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Sephora",
    discount: 5,
    price: 50,
    denominations: [25, 50, 75, 100],
    terms: [
      "Valid at all Sephora locations and Sephora.com.",
      "Cannot be exchanged for cash.",
      "No expiration date.",
    ],
    featured: false,
  },
  {
    id: "wayfair-1",
    brand: "Wayfair",
    category: "Home Goods",
    description: "Shop for furniture and home decor at Wayfair.",
    image: "https://placehold.co/400x300/EEE/31343C?text=Wayfair",
    discount: 9,
    price: 100,
    denominations: [50, 100, 200],
    terms: [
      "Valid for all purchases on Wayfair.com.",
      "Cannot be exchanged for cash.",
      "No expiration date.",
    ],
    featured: false,
  },
];

// Mock API function to get all gift cards
export const getAllGiftCards = () => {
  return Promise.resolve(giftCards);
};

// Mock API function to get a gift card by ID
export const getGiftCardById = (id: string) => {
  const card = giftCards.find(card => card.id === id);
  return Promise.resolve(card || null);
};

// Mock API function to get featured gift cards
export const getFeaturedGiftCards = () => {
  const featured = giftCards.filter(card => card.featured);
  return Promise.resolve(featured);
};

// Mock API function for searching gift cards
export const searchGiftCards = (query: string) => {
  const results = giftCards.filter(card => 
    card.brand.toLowerCase().includes(query.toLowerCase()) ||
    card.category.toLowerCase().includes(query.toLowerCase()) ||
    card.description.toLowerCase().includes(query.toLowerCase())
  );
  return Promise.resolve(results);
};

// Mock API function to filter gift cards by category
export const filterGiftCardsByCategory = (category: string) => {
  const results = category === 'All' 
    ? giftCards 
    : giftCards.filter(card => card.category === category);
  return Promise.resolve(results);
};

// Mock API for order history
export type Order = {
  id: string;
  date: string;
  items: {
    id: string;
    brand: string;
    amount: number;
    price: number;
  }[];
  total: number;
  status: 'completed' | 'processing' | 'failed';
};

// Mock order history data
export const orderHistory: Order[] = [
  {
    id: "order-1",
    date: "2023-05-15",
    items: [
      {
        id: "netflix-1",
        brand: "Netflix",
        amount: 50,
        price: 45, // After discount
      }
    ],
    total: 45,
    status: "completed",
  },
  {
    id: "order-2",
    date: "2023-04-20",
    items: [
      {
        id: "amazon-1",
        brand: "Amazon",
        amount: 100,
        price: 92.5, // After discount
      },
      {
        id: "starbucks-1",
        brand: "Starbucks",
        amount: 25,
        price: 23, // After discount
      }
    ],
    total: 115.5,
    status: "completed",
  },
];

// Mock API to get order history
export const getOrderHistory = (userId: string) => {
  // In a real app, this would filter by user ID
  console.log("Fetching orders for user:", userId);
  return Promise.resolve(orderHistory);
};

// Mock API for creating a new order
export const createOrder = (userId: string, items: any[], total: number) => {
  const newOrder: Order = {
    id: `order-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    items: items.map(item => ({
      id: item.id,
      brand: item.brand,
      amount: item.amount,
      price: item.price,
    })),
    total,
    status: "completed",
  };
  
  // In a real app, this would add the order to a database
  console.log("Created new order:", newOrder);
  
  return Promise.resolve(newOrder);
};
