
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our authentication context
type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap our app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to verify credentials
    // For now, let's simulate a successful login with a mock user
    console.log("Login attempt with:", email, password);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: "user123",
      name: "Test User",
      email: email,
    };
    
    setUser(mockUser);
    // Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to create a new user
    console.log("Register attempt with:", name, email, password);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: "user123",
      name: name,
      email: email,
    };
    
    setUser(mockUser);
    // Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check if user is already logged in from localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
