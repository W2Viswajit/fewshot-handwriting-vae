import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Save } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the user profile
      setIsUpdating(false);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8">Profile Settings</h1>
        
        <div className="bg-white rounded-lg shadow-card p-8">
          {updateSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md"
            >
              Profile updated successfully!
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-8 flex items-center">
              <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mr-6">
                <User size={32} className="text-primary-600" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-neutral-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Input
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<User size={18} className="text-neutral-400" />}
              />
              
              <Input
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<Mail size={18} className="text-neutral-400" />}
              />
            </div>
            
            <div className="mt-8 flex justify-end">
              {isEditing ? (
                <div className="flex space-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isUpdating}
                    icon={isUpdating ? undefined : <Save size={16} />}
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;