import React from 'react';
import { Check, Clock, X, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';

export const StatusTimeline = ({
  timeline = [],
  currentStatus = 'APPLIED'
}) => {
  const isRejected = currentStatus === 'REJECTED' || timeline.some(t => t.status === 'REJECTED');

  const steps = isRejected
    ? [
        { key: 'APPLIED', label: 'Application Submitted' },
        { key: 'REJECTED', label: 'Application Closed / Rejected' }
      ]
    : [
        { key: 'APPLIED', label: 'Application Submitted' },
        { key: 'SHORTLISTED', label: 'Shortlisted for Interview' },
        { key: 'SELECTED', label: 'Final Selection / Offer' }
      ];

  const getStepState = (stepKey, index) => {
    const entry = timeline.find(t => t.status === stepKey);
    if (entry) return { state: 'completed', entry };

    if (!isRejected) {
      if (currentStatus === 'SELECTED') return { state: 'completed' };
      if (currentStatus === 'SHORTLISTED' && index <= 1) return { state: 'completed' };
      if (currentStatus === 'APPLIED' && index === 0) return { state: 'completed' };
    }

    return { state: 'pending' };
  };

  return (
    <div className="py-4">
      <ol className="relative border-l border-slate-200 ml-4 space-y-6">
        {steps.map((step, idx) => {
          const { state, entry } = getStepState(step.key, idx);
          const isDone = state === 'completed';
          const isFailed = step.key === 'REJECTED';

          let iconBg = 'bg-slate-100 text-slate-400 border-slate-300';
          let icon = <Circle className="w-3.5 h-3.5" />;

          if (isFailed) {
            iconBg = 'bg-rose-50 text-rose-600 border-rose-300';
            icon = <X className="w-4 h-4 stroke-[2.5]" />;
          } else if (isDone) {
            iconBg = 'bg-emerald-50 text-emerald-600 border-emerald-300';
            icon = <Check className="w-4 h-4 stroke-[2.5]" />;
          }

          return (
            <li key={step.key} className="mb-4 ml-6 group">
              <span
                className={cn(
                  "absolute -left-3.5 flex items-center justify-center w-7 h-7 rounded-full border bg-white ring-4 ring-white transition",
                  iconBg
                )}
              >
                {icon}
              </span>
              <div className="flex flex-col">
                <h4 className={cn("text-sm font-semibold", isDone ? "text-slate-900" : "text-slate-400")}>
                  {step.label}
                </h4>
                {entry?.timestamp && (
                  <time className="text-xs text-slate-500 mt-0.5">
                    {new Date(entry.timestamp).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                )}
                {entry?.note && (
                  <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2 rounded border border-slate-100">
                    {entry.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default StatusTimeline;
