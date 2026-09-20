import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400 border border-slate-200",
    outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 focus:ring-indigo-500 shadow-sm",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5",
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
