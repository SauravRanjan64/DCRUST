import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';
import { ShieldCheck, ChevronDown, ChevronUp, Lock } from 'lucide-react';

export const ConsentScreen = () => {
  const { user, acceptConsent, logout } = useAuth();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleContinue = async () => {
    if (!agreed) return;
    setIsSubmitting(true);
    await acceptConsent();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Placement Data Consent
        </h1>
        <p className="text-xs text-indigo-600 font-medium mt-1">
          DCRUST Training & Placement Cell
        </p>

        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed space-y-2">
          <p>
            Hello <span className="font-semibold text-slate-900">{user?.name}</span>, before you begin exploring campus placement opportunities, university regulations require your explicit consent for processing placement data.
          </p>
          <p className="text-xs text-slate-600">
            Your academic credentials (CGPA, Branch, Roll Number, Backlogs) and contact information will be used exclusively for campus recruitment drives, eligibility verification, and communication by the T&P Cell and authorized visiting companies.
          </p>
        </div>

        {/* View Details Accordion */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>{showDetails ? 'Hide details' : 'View data usage details'}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showDetails && (
            <div className="mt-2 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5 animate-in fade-in">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Contact privacy: Your phone number remains masked from recruiters until you are shortlisted.</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Academic records are verified directly against university controller records.</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Data is strictly used for placement cycles and never shared with commercial marketing agencies.</span>
              </div>
            </div>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <Checkbox
            id="placement-consent"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            label="I agree to the placement data processing terms."
            helperText="You must accept this to proceed to placement drives and job applications."
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={logout}>
            Sign Out
          </Button>
          <Button
            variant="primary"
            size="md"
            disabled={!agreed}
            isLoading={isSubmitting}
            onClick={handleContinue}
            className="w-full sm:w-auto"
          >
            Continue to Portal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentScreen;
