import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = 'Unable to load data',
  message = 'An unexpected error occurred while fetching information. Please try again.',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`py-10 px-4 flex flex-col items-center justify-center text-center bg-rose-50/50 rounded-xl border border-rose-200 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-rose-900 mb-1">{title}</h3>
      <p className="text-xs text-rose-700 max-w-sm mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={RefreshCw}
          className="border-rose-300 text-rose-800 hover:bg-rose-100"
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
