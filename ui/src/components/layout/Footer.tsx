import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <PenLine className="text-primary-500 mr-2" size={24} />
              <span className="text-xl font-display font-bold">FontForge</span>
            </div>
            <p className="text-neutral-600 text-sm mb-4">
              Transform your handwriting into a personalized digital font. Share your unique style with the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="mailto:contact@fontforge.com" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-600 hover:text-primary-500 transition-colors text-sm">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-center text-neutral-500 text-sm">
            © {new Date().getFullYear()} FontForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;