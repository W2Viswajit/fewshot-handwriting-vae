import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenLine, Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isAuthenticated, 
  onLogout,
  userName
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <PenLine className="text-primary-500 mr-2" size={24} />
            <span className="text-xl font-display font-bold">FontForge</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-800 hover:text-primary-500 transition-colors">Home</Link>
            <Link to="/generate" className="text-neutral-800 hover:text-primary-500 transition-colors">Generate</Link>
            <Link to="/samples" className="text-neutral-800 hover:text-primary-500 transition-colors">Samples</Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-neutral-800 hover:text-primary-500"
                >
                  <span className="mr-1">{userName || 'User'}</span>
                  <User size={16} />
                </button>
                
                {/* User dropdown menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-card py-1 z-50"
                    >
                      <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                        Profile
                      </Link>
                      <Link to="/my-fonts" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                        My Fonts
                      </Link>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-accent-500 hover:bg-neutral-50 flex items-center"
                      >
                        <LogOut size={14} className="mr-1" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="secondary" size="sm">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-800"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="py-2 space-y-1">
                <Link to="/" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-50">Home</Link>
                <Link to="/generate" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-50">Generate</Link>
                <Link to="/samples" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-50">Samples</Link>
                
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-50">Profile</Link>
                    <Link to="/my-fonts" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-50">My Fonts</Link>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-accent-500 hover:bg-neutral-50 flex items-center"
                    >
                      <LogOut size={16} className="mr-1" /> Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 p-4">
                    <Link to="/login">
                      <Button variant="secondary" fullWidth>Sign In</Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="primary" fullWidth>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;