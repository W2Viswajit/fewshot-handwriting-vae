import React, { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const { isAuthenticated, login, signup, isLoading } = useAuth();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  
  const isLoginPage = location.pathname === '/login';
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/generate" replace />;
  }
  
  const handleSubmit = async (data: { name?: string; email: string; password: string }) => {
    setError(null);
    
    try {
      if (isLoginPage) {
        await login(data.email, data.password);
      } else {
        if (data.name) {
          await signup(data.name, data.email, data.password);
        }
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-xl shadow-card p-8"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <PenLine className="text-primary-500 mr-2" size={28} />
            <h1 className="text-2xl font-display font-bold">FontForge</h1>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {isLoginPage ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="text-neutral-600">
            {isLoginPage
              ? 'Sign in to access your personalized fonts'
              : 'Join FontForge to create and manage your handwriting fonts'}
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-accent-50 border border-accent-200 text-accent-700 rounded-md">
            {error}
          </div>
        )}
        
        <AuthForm
          type={isLoginPage ? 'login' : 'signup'}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        
        <div className="mt-6 text-center text-neutral-600">
          {isLoginPage ? (
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-600">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;