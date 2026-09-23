import React, { useId } from 'react';
import { cn } from '../../utils/cn';

export const Checkbox = React.forwardRef(({
  label,
  helperText,
  error,
  className,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const checkId = id || generatedId;

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={checkId}
          type="checkbox"
          className={cn(
            "w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition cursor-pointer",
            error && "border-rose-400",
            className
          )}
          {...props}
        />
      </div>
      <div className="text-sm">
        {label && (
          <label htmlFor={checkId} className="font-medium text-slate-800 select-none cursor-pointer">
            {label}
          </label>
        )}
        {helperText && <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>}
        {error && <p className="text-xs text-rose-600 mt-0.5 font-medium">{error}</p>}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
