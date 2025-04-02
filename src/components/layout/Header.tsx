
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Search, ShoppingCart, User } from "lucide-react";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto flex flex-col items-center px-4 py-4 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between md:w-auto">
          <Link to="/" className="text-2xl font-bold text-primary">
            GiftCardMarket
          </Link>
          
          <div className="flex items-center space-x-2 md:hidden">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Account</SheetTitle>
                  <SheetDescription>
                    {isAuthenticated
                      ? `Signed in as ${user?.name}`
                      : "Sign in to your account"}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard">
                        <Button variant="outline" className="w-full">
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => logout()}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="default" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="outline" className="w-full">
                          Register
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <form onSubmit={handleSearch} className="my-4 flex w-full max-w-sm md:my-0 md:mx-4">
          <Input
            type="search"
            placeholder="Search gift cards..."
            className="rounded-r-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="rounded-l-none">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <div className="hidden items-center space-x-4 md:flex">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
