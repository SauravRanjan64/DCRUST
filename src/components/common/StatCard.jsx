import React from 'react';
import { cn } from '../../utils/cn';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = 'indigo', // 'indigo' | 'emerald' | 'amber' | 'blue' | 'slate'
  className,
  onClick
}) => {
  const schemeStyles = {
    indigo: {
      border: 'border-slate-200',
      iconBg: 'bg-indigo-50 text-indigo-600',
      badgeBg: 'text-indigo-700 bg-indigo-50'
    },
    emerald: {
      border: 'border-slate-200',
      iconBg: 'bg-emerald-50 text-emerald-600',
      badgeBg: 'text-emerald-700 bg-emerald-50'
    },
    amber: {
      border: 'border-slate-200',
      iconBg: 'bg-amber-50 text-amber-600',
      badgeBg: 'text-amber-700 bg-amber-50'
    },
    blue: {
      border: 'border-slate-200',
      iconBg: 'bg-blue-50 text-blue-600',
      badgeBg: 'text-blue-700 bg-blue-50'
    },
    slate: {
      border: 'border-slate-200',
      iconBg: 'bg-slate-100 text-slate-600',
      badgeBg: 'text-slate-700 bg-slate-100'
    }
  };

  const scheme = schemeStyles[colorScheme] || schemeStyles.indigo;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl border p-5 shadow-xs transition duration-150",
        scheme.border,
        onClick && "cursor-pointer hover:border-indigo-300 hover:shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${scheme.badgeBg}`}>
            {trend}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
