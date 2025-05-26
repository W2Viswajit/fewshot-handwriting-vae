import React from 'react';

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  helperText,
  className = '',
  icon,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-ink mb-1">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            input-field
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-accent-500 focus:ring-accent-200' : 'border-neutral-200 focus:ring-primary-200'}
          `}
        />
      </div>
      
      {error && <p className="mt-1 text-sm text-accent-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-neutral-500">{helperText}</p>}
    </div>
  );
};

export default Input;