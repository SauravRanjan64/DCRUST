import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminApi from '../../services/adminApi';
import { useToast } from '../../contexts/ToastContext';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { Building2, CheckCircle2, XCircle, Eye, ShieldCheck } from 'lucide-react';

export const CompanyManagement = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [selectedComp, setSelectedComp] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-companies'],
    queryFn: () => adminApi.getCompanies(),
  });

  const companies = data?.companies || [];

  const verifyMutation = useMutation({
    mutationFn: (id) => adminApi.verifyCompany(id),
    onSuccess: () => {
      showToast({
        type: 'success',
        title: 'Status Updated',
        message: 'Company verification status has been toggled.',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-companies'] });
    },
  });

  const columns = [
    {
      header: 'Company Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.name}</span>
          <span className="text-xs text-slate-400">{row.location}</span>
        </div>
      ),
    },
    {
      header: 'Industry Sector',
      accessor: 'industry',
      render: (row) => (
        <span className="text-xs text-slate-700">{row.industry}</span>
      ),
    },
    {
      header: 'Recruiter Contact',
      accessor: 'email',
      render: (row) => (
        <div>
          <span className="text-xs font-mono text-slate-800 block">{row.email}</span>
          <span className="text-[11px] text-slate-400">{row.contactPerson}</span>
        </div>
      ),
    },
    {
      header: 'Verification',
      accessor: 'verified',
      render: (row) => (
        <Badge
          status={row.verified ? 'VERIFIED' : 'PENDING'}
          size="sm"
          showDot
        />
      ),
    },
    {
      header: 'Active Drives',
      accessor: 'activeDrivesCount',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {row.activeDrivesCount || 1} Drive(s)
        </span>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedComp(row)}
            leftIcon={Eye}
          >
            View
          </Button>
          <Button
            variant={row.verified ? 'danger' : 'success'}
            size="sm"
            onClick={() => verifyMutation.mutate(row.id)}
            isLoading={verifyMutation.isPending}
          >
            {row.verified ? 'Revoke' : 'Verify'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Recruiting Companies
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage visiting corporate partners, verify credentials, and review placement activity.
        </p>
      </div>

      {isLoading ? (
        <TableSkeleton rows={4} cols={6} />
      ) : error ? (
        <ErrorState
          title="Unable to load companies"
          message="Could not retrieve corporate recruiter list."
          onRetry={refetch}
        />
      ) : companies.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No registered companies"
          description="Visiting employers will appear here once registered."
        />
      ) : (
        <Table columns={columns} data={companies} />
      )}

      {/* Company Detail Modal */}
      {selectedComp && (
        <Modal
          isOpen={!!selectedComp}
          onClose={() => setSelectedComp(null)}
          title={selectedComp.name}
          subtitle={selectedComp.industry}
          maxWidth="max-w-lg"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedComp(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-3 text-xs">
            <p className="text-slate-600 leading-relaxed">{selectedComp.about}</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Person:</span>
                <span className="font-semibold text-slate-800">{selectedComp.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recruiter Email:</span>
                <span className="font-mono text-slate-800">{selectedComp.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Corporate Phone:</span>
                <span className="font-mono text-slate-800">{selectedComp.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-medium text-slate-800">{selectedComp.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Status:</span>
                <span className={`font-semibold ${selectedComp.verified ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {selectedComp.verified ? 'Verified University Partner' : 'Verification Pending'}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CompanyManagement;
