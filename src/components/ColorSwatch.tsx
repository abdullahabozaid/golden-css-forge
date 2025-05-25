
import { useState, useRef } from 'react';

interface ColorSwatchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorSwatch = ({ value, onChange, className = '' }: ColorSwatchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSwatchClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div
        className="w-11 h-6 rounded border border-gray-300 cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-gold hover:ring-opacity-50"
        style={{ backgroundColor: value }}
        onClick={handleSwatchClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSwatchClick();
          }
        }}
        aria-label={`Color picker for ${value}`}
      />
      <span className="text-xs text-gray-400 font-mono">{value.toUpperCase()}</span>
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
    </div>
  );
};

export default ColorSwatch;
