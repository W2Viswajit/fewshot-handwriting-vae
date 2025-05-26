import { jsPDF } from 'jspdf';
import { FontSample, FontSettings } from '../types';

// Function to create a ruled paper background
export const createRuledPaperBackground = (doc: jsPDF): void => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Set light cream background
  doc.setFillColor(252, 249, 242);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Draw horizontal ruled lines
  doc.setDrawColor(200, 215, 240);
  doc.setLineWidth(0.5);
  
  const lineGap = 10;
  for (let y = 30; y < pageHeight; y += lineGap) {
    doc.line(20, y, pageWidth - 20, y);
  }
  
  // Draw margin line
  doc.setDrawColor(235, 110, 110);
  doc.setLineWidth(0.5);
  doc.line(30, 30, 30, pageHeight - 20);
};

// Function to generate PDF with sample text
export const generateOutputPDF = (
  text: string,
  settings: FontSettings
): string => {
  const doc = new jsPDF();
  
  createRuledPaperBackground(doc);
  
  // Add title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(70, 90, 120);
  doc.text('FontForge Handwritten Text', 20, 20);
  
  // Add date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 26);
  
  // Add custom text
  doc.setFont('helvetica', settings.style);
  doc.setFontSize(settings.size);
  doc.setTextColor(0, 0, 0);
  
  // Split text into lines and respect line height
  const lines = doc.splitTextToSize(text, 150);
  let y = 40;
  
  lines.forEach(line => {
    doc.text(line, 40, y);
    y += settings.lineHeight;
  });
  
  // Generate base64 string
  return doc.output('datauristring');
};

// Function to process PDF input
export const processPDFInput = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read the PDF file'));
    };
    
    reader.readAsDataURL(file);
  });
};

// Generate sample letter templates
export const generateSampleTemplates = (language: 'english' | 'hindi'): FontSample[] => {
  const englishLetters = ['A', 'B', 'C', 'D', 'E'];
  const hindiLetters = ['अ', 'आ', 'इ', 'ई', 'उ'];
  
  const letters = language === 'english' ? englishLetters : hindiLetters;
  
  return letters.map(letter => ({
    letter,
    samples: Array(5).fill('')
  }));
};

// Get default font settings
export const getDefaultFontSettings = (): FontSettings => {
  return {
    style: 'normal',
    weight: 400,
    size: 12,
    lineHeight: 14,
    color: '#000000'
  };
};