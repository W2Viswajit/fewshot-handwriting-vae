import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PDFUploader from '../components/fontGenerator/PDFUploader';
import SampleTemplate from '../components/fontGenerator/SampleTemplate';
import FontSettings from '../components/fontGenerator/FontSettings';
import TextPreview from '../components/fontGenerator/TextPreview';
import { FontSample, FontSettings as FontSettingsType } from '../types';
import { generateSampleTemplates, getDefaultFontSettings } from '../utils/pdfUtils';

const GeneratePage: React.FC = () => {
  const [samples, setSamples] = useState<FontSample[]>(generateSampleTemplates('english'));
  const [fontSettings, setFontSettings] = useState<FontSettingsType>(getDefaultFontSettings());
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  
  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // In a real implementation, this would process the PDF and extract handwriting
  };
  
  const handleSampleUpdate = (updatedSample: FontSample) => {
    setSamples(prevSamples => 
      prevSamples.map(sample => 
        sample.letter === updatedSample.letter ? updatedSample : sample
      )
    );
  };
  
  const handleSettingsChange = (newSettings: FontSettingsType) => {
    setFontSettings(newSettings);
  };
  
  const handleLanguageChange = (selectedLanguage: 'english' | 'hindi') => {
    setLanguage(selectedLanguage);
    setSamples(generateSampleTemplates(selectedLanguage));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-24"
    >
      <h1 className="text-3xl font-display font-bold mb-8">Generate Your Handwriting Font</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <h2 className="text-xl font-semibold font-display mb-4">Upload Samples or Create Templates</h2>
            
            <PDFUploader onFileUpload={handleFileUpload} />
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Language</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLanguageChange('english')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    language === 'english' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('hindi')}
                  className={`px-3 py-1.5 rounded-md text-sm ${
                    language === 'hindi' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Hindi
                </button>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Letter Templates ({language === 'english' ? 'A-E' : 'अ-उ'})
              </h3>
              <p className="text-neutral-600 text-sm mb-6">
                Create 5 samples for each letter to generate an accurate font
              </p>
              
              {samples.map((sample) => (
                <SampleTemplate
                  key={sample.letter}
                  sample={sample}
                  onSampleUpdate={handleSampleUpdate}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <FontSettings 
            settings={fontSettings}
            onSettingsChange={handleSettingsChange}
          />
          
          <TextPreview fontSettings={fontSettings} />
        </div>
      </div>
    </motion.div>
  );
};

export default GeneratePage;