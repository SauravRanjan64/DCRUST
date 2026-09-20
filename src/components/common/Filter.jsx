import React from 'react';
import { Filter as FilterIcon } from 'lucide-react';

export const Filter = ({
  label,
  value,
  onChange,
  options = [],
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap hidden sm:inline">
          {label}:
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs font-medium bg-white border border-slate-300 text-slate-700 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-colors cursor-pointer shadow-xs"
      >
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
