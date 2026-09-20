import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary', // 'primary' | 'danger' | 'success'
  isLoading = false,
  children
}) => {
  let Icon = HelpCircle;
  let iconBg = 'bg-indigo-50 text-indigo-600';

  if (variant === 'danger') {
    Icon = AlertCircle;
    iconBg = 'bg-rose-50 text-rose-600';
  } else if (variant === 'success') {
    Icon = CheckCircle2;
    iconBg = 'bg-emerald-50 text-emerald-600';
  }

  const footer = (
    <>
      <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button
        variant={variant === 'danger' ? 'danger' : variant === 'success' ? 'success' : 'primary'}
        size="sm"
        onClick={onConfirm}
        isLoading={isLoading}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} footer={footer} maxWidth="max-w-md">
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
          {description && <p className="text-sm text-slate-600 leading-relaxed mb-3">{description}</p>}
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
