import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };
  
  const handleFile = (selectedFile: File) => {
    setError(null);
    
    // Check if file is a PDF
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB');
      return;
    }
    
    setFile(selectedFile);
    onFileUpload(selectedFile);
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Upload Sample</h3>
      <p className="text-neutral-600 text-sm mb-4">
        Upload a PDF file containing handwriting samples or use our sample templates below.
      </p>
      
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragging 
              ? 'border-primary-400 bg-primary-50' 
              : 'border-neutral-300 hover:border-primary-300 hover:bg-neutral-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".pdf"
            className="hidden"
          />
          
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.05 : 1 }}
            className="flex flex-col items-center"
          >
            <Upload size={40} className="text-neutral-400 mb-4" />
            <p className="text-neutral-700 font-medium mb-2">
              Drag & drop your PDF file here
            </p>
            <p className="text-neutral-500 text-sm mb-4">
              or click to browse files
            </p>
            <Button variant="secondary" size="sm">
              Select PDF File
            </Button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border rounded-lg p-4 bg-neutral-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-full p-2 mr-3">
                <FileText size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-800">{file.name}</p>
                <p className="text-xs text-neutral-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Check size={18} className="text-green-500" />
              <button 
                onClick={handleRemoveFile}
                className="text-neutral-400 hover:text-accent-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {error && (
        <p className="mt-2 text-accent-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default PDFUploader;