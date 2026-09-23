import React from 'react';
import { useQuery } from '@tanstack/react-query';
import companyApi from '../../services/companyApi';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { Briefcase } from 'lucide-react';

export const CompanyDrives = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['company-drives'],
    queryFn: () => companyApi.getCompanyDrives(),
  });

  const drives = data?.drives || [];

  const columns = [
    {
      header: 'Job Title',
      accessor: 'title',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.title}</span>
          <span className="text-xs text-slate-400">{row.location}</span>
        </div>
      ),
    },
    {
      header: 'Compensation',
      accessor: 'salaryRange',
      render: (row) => (
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          {row.salaryRange}
        </span>
      ),
    },
    {
      header: 'Allowed Disciplines',
      accessor: 'allowedBranches',
      render: (row) => (
        <span className="text-xs text-slate-700">
          {row.allowedBranches?.join(', ')}
        </span>
      ),
    },
    {
      header: 'Cutoff Criteria',
      accessor: 'minCgpa',
      render: (row) => (
        <span className="text-xs text-slate-600">
          CGPA &ge; {row.minCgpa} • Backlogs &le; {row.maxBacklogs}
        </span>
      ),
    },
    {
      header: 'Deadline',
      accessor: 'applicationEnd',
      render: (row) => (
        <span className="text-xs text-slate-500 font-medium">
          {row.applicationEnd}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge status={row.status} size="sm" showDot />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Active Placement Drives
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Placement drives published on the university portal under your corporate account.
        </p>
      </div>

      {isLoading ? (
        <TableSkeleton rows={3} cols={6} />
      ) : error ? (
        <ErrorState
          title="Unable to load drives"
          message="Could not retrieve your drives."
          onRetry={refetch}
        />
      ) : drives.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No drives published"
          description="Contact the T&P Cell if your authorized drive is not listed here."
        />
      ) : (
        <Table columns={columns} data={drives} />
      )}
    </div>
  );
};

export default CompanyDrives;
