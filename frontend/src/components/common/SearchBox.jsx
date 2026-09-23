import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export const SearchBox = ({
  value = '',
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
  className
}) => {
  const [innerVal, setInnerVal] = useState(value);

  useEffect(() => {
    setInnerVal(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange && innerVal !== value) {
        onChange(innerVal);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [innerVal, debounceMs, onChange, value]);

  const handleClear = () => {
    setInnerVal('');
    if (onChange) onChange('');
  };

  return (
    <div className={cn("relative flex-1 min-w-[200px]", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={innerVal}
        onChange={(e) => setInnerVal(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors shadow-xs"
      />
      {innerVal && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
