import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import applicationApi from '../../services/applicationApi';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { Eye, Briefcase, FileCheck, ArrowRight } from 'lucide-react';

export const MyApplications = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['my-applications'],
    queryFn: () => applicationApi.getMyApplications(),
  });

  const applications = data?.applications || [];

  const columns = [
    {
      header: 'Company',
      accessor: 'companyName',
      render: (row) => (
        <span className="font-semibold text-slate-900">{row.companyName}</span>
      ),
    },
    {
      header: 'Job Title',
      accessor: 'jobTitle',
      render: (row) => (
        <div>
          <span className="font-medium text-slate-800">{row.jobTitle}</span>
          <span className="text-xs text-slate-400 block">{row.location}</span>
        </div>
      ),
    },
    {
      header: 'Applied On',
      accessor: 'appliedOn',
      render: (row) => (
        <span className="text-xs text-slate-600">
          {new Date(row.appliedOn).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      header: 'Match Score',
      accessor: 'matchScore',
      render: (row) => (
        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
          {row.matchScore}%
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge status={row.status} showDot size="sm" />,
    },
    {
      header: 'Action',
      align: 'right',
      render: (row) => (
        <Link to={`/student/applications/${row.id}`}>
          <Button variant="outline" size="sm" leftIcon={Eye}>
            Details
          </Button>
        </Link>
      ),
    },
  ];

  const renderMobileCard = (row) => (
    <div>
      <div className="flex justify-between items-start mb-1.5">
        <div>
          <span className="text-xs font-semibold uppercase text-slate-500">{row.companyName}</span>
          <h4 className="text-sm font-bold text-slate-900">{row.jobTitle}</h4>
        </div>
        <Badge status={row.status} size="sm" />
      </div>
      <div className="flex justify-between items-center text-xs text-slate-500 my-2">
        <span>Applied: {new Date(row.appliedOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
          Match: {row.matchScore}%
        </span>
      </div>
      <div className="pt-2 border-t border-slate-100 flex justify-end">
        <Link to={`/student/applications/${row.id}`}>
          <Button variant="outline" size="sm" rightIcon={ArrowRight}>
            View Application
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            My Applications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time status changes, interview shortlists, and placement offers.
          </p>
        </div>
        <Link to="/student/jobs">
          <Button variant="primary" size="sm" leftIcon={Briefcase}>
            Explore Jobs
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <TableSkeleton rows={4} cols={6} />
      ) : error ? (
        <ErrorState
          title="Unable to load applications"
          message="Could not fetch your submission history."
          onRetry={refetch}
        />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={FileCheck}
          title="You have not applied to any job yet"
          description="Browse active placement drives and check your eligibility to submit your first application."
          actionLabel="View Jobs"
          onAction={() => window.location.assign('/student/jobs')}
        />
      ) : (
        <Table
          columns={columns}
          data={applications}
          renderMobileCard={renderMobileCard}
        />
      )}
    </div>
  );
};

export default MyApplications;
