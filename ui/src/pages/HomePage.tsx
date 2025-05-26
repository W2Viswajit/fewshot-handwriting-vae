import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenLine, Download, UploadCloud, Edit, Users } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 to-primary-50 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Turn Your Handwriting Into a
                <span className="text-primary-500"> Digital Font</span>
              </h1>
              
              <p className="text-lg text-neutral-700 mb-8">
                Transform your unique handwriting into a personalized font that you can use anywhere. 
                Share your personal touch in documents, designs, and digital content.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to={isAuthenticated ? "/generate" : "/signup"}>
                  <Button 
                    variant="primary" 
                    size="lg"
                    icon={<PenLine size={18} />}
                  >
                    {isAuthenticated ? "Create Font" : "Get Started"}
                  </Button>
                </Link>
                
                <Link to="/samples">
                  <Button 
                    variant="secondary" 
                    size="lg"
                  >
                    View Samples
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="ruled-paper rounded-xl shadow-card p-8 min-h-[400px] max-w-[500px] mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-display text-xl text-primary-500">FontForge</div>
                  <div className="text-sm text-neutral-500">June 15, 2025</div>
                </div>
                
                <div className="handwritten-content text-lg pl-10">
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                    Dear Reader,
                  </p>
                  <br />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                    Thank you for checking out FontForge. I'm excited to help you transform your unique handwriting into a digital font.
                  </p>
                  <br />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                    Get started today!
                  </p>
                  <br />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                    Sincerely,
                    <br />
                    Your Handwriting
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Create your personalized handwriting font in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-8 text-center"
            >
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <UploadCloud className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">1. Upload Samples</h3>
              <p className="text-neutral-600">
                Upload a PDF with handwriting samples or use our interactive templates to create samples
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-8 text-center"
            >
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Edit className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">2. Customize Font</h3>
              <p className="text-neutral-600">
                Adjust size, weight, and style to create the perfect digital version of your handwriting
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-8 text-center"
            >
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Download className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">3. Generate & Download</h3>
              <p className="text-neutral-600">
                Generate your custom font and download it as a PDF to use in your documents
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Users Say</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who've digitized their handwriting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <Users size={18} className="text-neutral-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-neutral-500">Designer</p>
                </div>
              </div>
              <p className="text-neutral-700">
                "FontForge helped me create a personalized font based on my handwriting. Now I can add a personal touch to all my design projects!"
              </p>
            </div>
            
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <Users size={18} className="text-neutral-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Mark Williams</h4>
                  <p className="text-sm text-neutral-500">Teacher</p>
                </div>
              </div>
              <p className="text-neutral-700">
                "I use my custom font to create worksheets for my students. They love seeing my handwriting in their digital assignments!"
              </p>
            </div>
            
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <Users size={18} className="text-neutral-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-neutral-500">Content Creator</p>
                </div>
              </div>
              <p className="text-neutral-700">
                "FontForge made it incredibly easy to create both Hindi and English fonts from my handwriting. The bilingual support is fantastic!"
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to={isAuthenticated ? "/generate" : "/signup"}>
              <Button variant="primary">
                {isAuthenticated ? "Create Your Font" : "Join Them Today"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;