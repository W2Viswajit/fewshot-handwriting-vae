import React from 'react';
import { FontSettings as FontSettingsType } from '../../types';
import { Sliders } from 'lucide-react';

interface FontSettingsProps {
  settings: FontSettingsType;
  onSettingsChange: (newSettings: FontSettingsType) => void;
}

const FontSettings: React.FC<FontSettingsProps> = ({ 
  settings, 
  onSettingsChange 
}) => {
  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({
      ...settings,
      style: e.target.value as 'normal' | 'italic' | 'oblique'
    });
  };
  
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      weight: parseInt(e.target.value)
    });
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      size: parseInt(e.target.value)
    });
  };
  
  const handleLineHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      lineHeight: parseInt(e.target.value)
    });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({
      ...settings,
      color: e.target.value
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 mb-6">
      <div className="flex items-center mb-4">
        <Sliders size={18} className="text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold">Font Settings</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Font Style
          </label>
          <select
            value={settings.style}
            onChange={handleStyleChange}
            className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Font Weight: {settings.weight}
          </label>
          <input
            type="range"
            min="300"
            max="700"
            step="100"
            value={settings.weight}
            onChange={handleWeightChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-1">
            <span>Light</span>
            <span>Regular</span>
            <span>Bold</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Font Size: {settings.size}px
          </label>
          <input
            type="range"
            min="10"
            max="24"
            step="1"
            value={settings.size}
            onChange={handleSizeChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-1">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Line Height: {settings.lineHeight}px
          </label>
          <input
            type="range"
            min="12"
            max="36"
            step="2"
            value={settings.lineHeight}
            onChange={handleLineHeightChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-1">
            <span>Compact</span>
            <span>Normal</span>
            <span>Spacious</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Ink Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={settings.color}
              onChange={handleColorChange}
              className="w-10 h-10 rounded-md border border-neutral-200 mr-2"
            />
            <span className="text-sm text-neutral-600">{settings.color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSettings;