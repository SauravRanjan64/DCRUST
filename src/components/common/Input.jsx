import React, { useId } from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  className,
  type = 'text',
  leftIcon: LeftIcon,
  rightElement,
  required = false,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            LeftIcon && "pl-9",
            rightElement && "pr-10",
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="mt-1 text-xs text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
