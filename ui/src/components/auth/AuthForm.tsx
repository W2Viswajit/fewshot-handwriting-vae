import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../common/Input';
import Button from '../common/Button';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  type, 
  onSubmit,
  isLoading = false
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: ''
    };

    // Validate name for signup
    if (type === 'signup' && !name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...(type === 'signup' ? { name } : {}),
        email,
        password
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <Input
            id="name"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            error={errors.name}
            icon={<User size={18} className="text-neutral-400" />}
          />
        )}
        
        <Input
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          error={errors.email}
          icon={<Mail size={18} className="text-neutral-400" />}
        />
        
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={type === 'signup' ? 'Choose a secure password' : 'Enter your password'}
          required
          error={errors.password}
          icon={<Lock size={18} className="text-neutral-400" />}
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={isLoading}
          className="mt-6"
        >
          {isLoading ? 'Loading...' : type === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
    </motion.div>
  );
};

export default AuthForm;