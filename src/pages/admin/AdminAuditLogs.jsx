import React from 'react';
import { useQuery } from '@tanstack/react-query';
import adminApi from '../../services/adminApi';
import Table from '../../components/common/Table';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { ScrollText, Shield } from 'lucide-react';

export const AdminAuditLogs = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-audit'],
    queryFn: () => adminApi.getAuditLogs(),
  });

  const logs = data?.auditLogs || [];

  const columns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      render: (row) => (
        <span className="text-xs text-slate-500 font-mono">
          {new Date(row.timestamp).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </span>
      ),
    },
    {
      header: 'Actor',
      accessor: 'actor',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-800">
          {row.actor}
        </span>
      ),
    },
    {
      header: 'Action Taken',
      accessor: 'action',
      render: (row) => (
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-indigo-700">
          {row.action}
        </span>
      ),
    },
    {
      header: 'Event Details',
      accessor: 'details',
      render: (row) => (
        <span className="text-xs text-slate-600 leading-relaxed">
          {row.details}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          System Audit Logs
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Immutable event log of all administrative actions, drive publications, consent updates, and recruiter decisions.
        </p>
      </div>

      {isLoading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : error ? (
        <ErrorState
          title="Unable to load audit logs"
          message="Could not retrieve system audit history."
          onRetry={refetch}
        />
      ) : logs.length === 0 ? (
        <EmptyState
          icon={ScrollText}
          title="No audit entries logged"
          description="System events will appear here as placement actions occur."
        />
      ) : (
        <Table columns={columns} data={logs} />
      )}
    </div>
  );
};

export default AdminAuditLogs;
