import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({
  children,
  className,
  title,
  subtitle,
  action,
  footer,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-150",
        className
      )}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
