import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import adminApi from '../../services/adminApi';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import SearchBox from '../../components/common/SearchBox';
import Filter from '../../components/common/Filter';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { FileCheck, Search } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'APPLIED', label: 'Applied' },
  { value: 'SHORTLISTED', label: 'Shortlisted' },
  { value: 'SELECTED', label: 'Selected' },
  { value: 'REJECTED', label: 'Rejected' },
];

export const AdminApplications = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-applications', { status }],
    queryFn: () => adminApi.getApplications({ status }),
  });

  const applications = data?.applications || [];

  const filtered = applications.filter((app) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      app.studentName?.toLowerCase().includes(q) ||
      app.rollNumber?.includes(q) ||
      app.companyName?.toLowerCase().includes(q) ||
      app.jobTitle?.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      header: 'Student Candidate',
      accessor: 'studentName',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.studentName}</span>
          <span className="text-xs text-slate-400 font-mono">
            {row.rollNumber} • {row.branch}
          </span>
        </div>
      ),
    },
    {
      header: 'Placement Drive',
      accessor: 'companyName',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-800 block">{row.companyName}</span>
          <span className="text-xs text-slate-500">{row.jobTitle}</span>
        </div>
      ),
    },
    {
      header: 'CGPA',
      accessor: 'cgpa',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-700">{row.cgpa} / 10.0</span>
      ),
    },
    {
      header: 'Match',
      accessor: 'matchScore',
      render: (row) => (
        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
          {row.matchScore}%
        </span>
      ),
    },
    {
      header: 'Applied Date',
      accessor: 'appliedOn',
      render: (row) => (
        <span className="text-xs text-slate-500">
          {new Date(row.appliedOn).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      header: 'Current Status',
      accessor: 'status',
      render: (row) => <Badge status={row.status} size="sm" showDot />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Application Tracking
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time cross-drive candidate submissions and interview shortlists.
        </p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Filter by student name, roll number, or company..."
          className="flex-1"
        />
        <Filter
          label="Status"
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
        />
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : error ? (
        <ErrorState
          title="Unable to load applications"
          message="Could not retrieve application submissions."
          onRetry={refetch}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FileCheck}
          title="No applications found"
          description="No student applications matched your criteria."
        />
      ) : (
        <Table columns={columns} data={filtered} />
      )}
    </div>
  );
};

export default AdminApplications;
