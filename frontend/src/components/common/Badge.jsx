import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({
  children,
  status,
  variant,
  size = 'md',
  showDot = false,
  className
}) => {
  // Normalize status string if provided
  const normalizedStatus = (status || variant || '').toUpperCase();

  const statusStyles = {
    ELIGIBLE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    APPLIED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    SHORTLISTED: 'bg-blue-50 text-blue-700 border-blue-200',
    SELECTED: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold',
    REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    CLOSED: 'bg-slate-100 text-slate-700 border-slate-200',
    ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    VERIFIED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    DEFAULT: 'bg-slate-50 text-slate-700 border-slate-200'
  };

  const dotColors = {
    ELIGIBLE: 'bg-emerald-500',
    APPLIED: 'bg-indigo-500',
    SHORTLISTED: 'bg-blue-500',
    SELECTED: 'bg-emerald-600',
    REJECTED: 'bg-rose-500',
    PENDING: 'bg-amber-500',
    CLOSED: 'bg-slate-400',
    ACTIVE: 'bg-emerald-500',
    VERIFIED: 'bg-indigo-500',
    DEFAULT: 'bg-slate-400'
  };

  const currentStyle = statusStyles[normalizedStatus] || statusStyles.DEFAULT;
  const dotColor = dotColors[normalizedStatus] || dotColors.DEFAULT;

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-md border tracking-wide select-none",
        currentStyle,
        sizes[size],
        className
      )}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {children || status}
    </span>
  );
};

export default Badge;
