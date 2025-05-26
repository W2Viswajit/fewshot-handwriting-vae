import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontSample } from '../../types';

interface SampleTemplateProps {
  sample: FontSample;
  onSampleUpdate: (updatedSample: FontSample) => void;
}

const SampleTemplate: React.FC<SampleTemplateProps> = ({ sample, onSampleUpdate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleSampleChange = (index: number, value: string) => {
    const updatedSamples = [...sample.samples];
    updatedSamples[index] = value;
    
    onSampleUpdate({
      ...sample,
      samples: updatedSamples
    });
  };
  
  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold font-display">{sample.letter}</h3>
        <span className="text-xs text-neutral-500">5 samples required</span>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {sample.samples.map((_, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            className={`h-10 flex items-center justify-center rounded-md border ${
              activeIndex === index 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-neutral-200 bg-white'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
      
      <div className="ruled-paper rounded-md p-4 min-h-[200px] relative">
        {/* Sample area with customizable height based on line height */}
        <div 
          className="w-full h-full"
          style={{ '--ruled-line-height': '24px' } as React.CSSProperties}
        >
          <textarea
            className="w-full h-full bg-transparent resize-none border-none focus:outline-none focus:ring-0 z-10 relative"
            placeholder={`Write the letter "${sample.letter}" here...`}
            value={sample.samples[activeIndex] || ''}
            onChange={(e) => handleSampleChange(activeIndex, e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-4 text-sm text-neutral-600">
        <p>Write the letter in your natural handwriting style, staying within the lines.</p>
      </div>
    </div>
  );
};

export default SampleTemplate;