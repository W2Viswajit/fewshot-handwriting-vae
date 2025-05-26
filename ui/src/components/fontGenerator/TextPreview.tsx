import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontSettings } from '../../types';
import Button from '../common/Button';
import { Download } from 'lucide-react';
import { generateOutputPDF } from '../../utils/pdfUtils';

interface TextPreviewProps {
  fontSettings: FontSettings;
}

const TextPreview: React.FC<TextPreviewProps> = ({ fontSettings }) => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const handleLanguageChange = (selectedLanguage: 'english' | 'hindi') => {
    setLanguage(selectedLanguage);
  };
  
  const handleExportPDF = () => {
    if (!text.trim()) return;
    
    const pdfDataUri = generateOutputPDF(text, fontSettings);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = `fontforge-text-${new Date().getTime()}.pdf`;
    link.click();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-xl font-semibold font-display mb-4">Preview Your Text</h3>
      
      <div className="mb-4">
        <div className="flex space-x-2 mb-3">
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
        
        <textarea
          className="w-full min-h-[200px] px-4 py-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent resize-none"
          placeholder={language === 'english' ? "Type your text here..." : "यहां अपना टेक्स्ट टाइप करें..."}
          value={text}
          onChange={handleTextChange}
        />
      </div>
      
      <div className="mb-6 ruled-paper rounded-md p-4 min-h-[200px]">
        <div 
          className="w-full h-full"
          style={{ 
            '--ruled-line-height': `${fontSettings.lineHeight}px`,
            fontStyle: fontSettings.style,
            fontWeight: fontSettings.weight,
            fontSize: `${fontSettings.size}px`,
            color: fontSettings.color
          } as React.CSSProperties}
        >
          {text || (
            <span className="text-neutral-400 italic">
              {language === 'english' 
                ? "Your text will appear here in handwriting style..." 
                : "आपका टेक्स्ट यहां हस्तलिखित शैली में दिखाई देगा..."}
            </span>
          )}
        </div>
      </div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          variant="primary" 
          fullWidth
          icon={<Download size={16} />}
          onClick={handleExportPDF}
          disabled={!text.trim()}
        >
          Download as PDF
        </Button>
      </motion.div>
    </div>
  );
};

export default TextPreview;