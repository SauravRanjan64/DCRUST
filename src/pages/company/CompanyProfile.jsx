import React from 'react';
import { useQuery } from '@tanstack/react-query';
import companyApi from '../../services/companyApi';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { ProfileSkeleton } from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import { Building2, Globe, Phone, Mail, ShieldCheck, MapPin } from 'lucide-react';

export const CompanyProfile = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['company-profile'],
    queryFn: () => companyApi.getProfile(),
  });

  const company = data?.company;

  if (isLoading) return <ProfileSkeleton />;
  if (error || !company) {
    return (
      <ErrorState
        title="Unable to load profile"
        message="Could not retrieve company profile information."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Employer Profile
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Corporate organization credentials registered with the DCRUST Training & Placement Cell.
        </p>
      </div>

      <Card title="Corporate Details" subtitle="Official registered university partner information">
        <div className="space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
                <span className="text-xs text-slate-500">{company.industry}</span>
              </div>
            </div>
            <Badge status={company.verified ? 'VERIFIED' : 'PENDING'} showDot />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {company.about}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Lead Coordinator</span>
              <span className="font-semibold text-slate-800 text-sm block">{company.contactPerson}</span>
              <span className="text-slate-500 flex items-center gap-1 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {company.email}
              </span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Work Location & Contact</span>
              <span className="font-semibold text-slate-800 text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {company.location}
              </span>
              <span className="text-slate-500 flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {company.phone}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompanyProfile;
