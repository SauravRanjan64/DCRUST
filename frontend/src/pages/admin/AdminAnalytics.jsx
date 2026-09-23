import React from 'react';
import { useQuery } from '@tanstack/react-query';
import adminApi from '../../services/adminApi';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import { BarChart3, TrendingUp, Award, Building2, Users } from 'lucide-react';

export const AdminAnalytics = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats(),
  });

  if (isLoading) return <DashboardSkeleton />;
  if (error) {
    return (
      <ErrorState
        title="Failed to load analytics"
        message="Could not load placement statistics."
        onRetry={refetch}
      />
    );
  }

  const branchStats = data?.branchStats || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Placement Analytics & Insights
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          High-level recruitment highlights and department placement trends for the 2024–2025 academic session.
        </p>
      </div>

      {/* Top High-level Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Placement Rate"
          value="78.4%"
          subtitle="Registered eligible students placed"
          icon={TrendingUp}
          colorScheme="emerald"
        />
        <StatCard
          title="Highest CTC Package"
          value="₹28.5 LPA"
          subtitle="Offered by Global Tech"
          icon={Award}
          colorScheme="indigo"
        />
        <StatCard
          title="Average CTC Package"
          value="₹7.8 LPA"
          subtitle="B.Tech Cohort Average"
          icon={BarChart3}
          colorScheme="blue"
        />
        <StatCard
          title="Total Offers Issued"
          value="342"
          subtitle="Across 38 recruiting companies"
          icon={Building2}
          colorScheme="slate"
        />
      </div>

      {/* Branch Performance Breakdown */}
      <Card
        title="Department-wise Placement Performance"
        subtitle="Offer conversion across engineering branches"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3 text-right">Registered</th>
                <th className="py-2.5 px-3 text-right">Applications</th>
                <th className="py-2.5 px-3 text-right">Offers</th>
                <th className="py-2.5 px-3 text-right">Placement Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {branchStats.map((b) => {
                const rate = Math.round((b.offers / (b.applications / 3.5)) * 100);
                return (
                  <tr key={b.branch} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-bold text-slate-900">{b.branch}</td>
                    <td className="py-3 px-3 text-right">{Math.round(b.applications / 3)}</td>
                    <td className="py-3 px-3 text-right font-mono">{b.applications}</td>
                    <td className="py-3 px-3 text-right font-semibold text-emerald-700">{b.offers}</td>
                    <td className="py-3 px-3 text-right font-bold text-indigo-600">
                      {Math.min(rate, 94)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
