import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    createdAt: new Date().toISOString(),
    fonts: []
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fontforge_user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('fontforge_user');
      }
    }
    
    setIsLoading(false);
  }, []);
  
  // Login function - mock implementation
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Create user object without password
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Store in local storage
    localStorage.setItem('fontforge_user', JSON.stringify(userWithoutPassword));
    
    setUser(userWithoutPassword as User);
    setIsLoading(false);
  };
  
  // Signup function - mock implementation
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      fonts: []
    };
    
    // Add to mock users (in a real app, this would be an API call)
    mockUsers.push(newUser);
    
    // Create user object without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Store in local storage
    localStorage.setItem('fontforge_user', JSON.stringify(userWithoutPassword));
    
    setUser(userWithoutPassword as User);
    setIsLoading(false);
  };
  
  // Logout function
  const logout = (): void => {
    localStorage.removeItem('fontforge_user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);