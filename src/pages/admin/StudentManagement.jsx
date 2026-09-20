import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import adminApi from '../../services/adminApi';
import Table from '../../components/common/Table';
import SearchBox from '../../components/common/SearchBox';
import Filter from '../../components/common/Filter';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import { TableSkeleton } from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import { Eye, Shield, User, FileText, CheckCircle2 } from 'lucide-react';

const BRANCH_OPTIONS = [
  { value: 'ALL', label: 'All Branches' },
  { value: 'CSE', label: 'CSE' },
  { value: 'IT', label: 'IT' },
  { value: 'ECE', label: 'ECE' },
  { value: 'EEE', label: 'EEE' },
  { value: 'Mechanical', label: 'Mechanical' },
  { value: 'Civil', label: 'Civil' },
  { value: 'Biotechnology', label: 'Biotechnology' },
];

const BATCH_OPTIONS = [
  { value: 'ALL', label: 'All Batches' },
  { value: '2024', label: 'Batch 2024' },
  { value: '2025', label: 'Batch 2025' },
  { value: '2026', label: 'Batch 2026' },
];

export const StudentManagement = () => {
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('ALL');
  const [batch, setBatch] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-students', { search, branch, batch }],
    queryFn: () => adminApi.getStudents({ search, branch, batch }),
  });

  const students = data?.students || [];

  const columns = [
    {
      header: 'Student Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.name}</span>
          <span className="text-xs text-slate-400 font-mono">{row.email}</span>
        </div>
      ),
    },
    {
      header: 'Roll / Reg No.',
      accessor: 'rollNumber',
      render: (row) => (
        <div>
          <span className="font-mono text-xs font-semibold text-slate-800 block">
            {row.rollNumber}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {row.registrationNumber}
          </span>
        </div>
      ),
    },
    {
      header: 'Branch & Batch',
      accessor: 'branch',
      render: (row) => (
        <div>
          <span className="font-medium text-slate-800">{row.branch}</span>
          <span className="text-xs text-slate-400 block">Batch of {row.batch}</span>
        </div>
      ),
    },
    {
      header: 'CGPA',
      accessor: 'cgpa',
      render: (row) => (
        <span className="font-semibold text-slate-800">
          {row.cgpa} / 10.0
        </span>
      ),
    },
    {
      header: 'Backlogs',
      accessor: 'activeBacklogs',
      render: (row) => (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${
            row.activeBacklogs === 0
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          {row.activeBacklogs}
        </span>
      ),
    },
    {
      header: 'Phone (Masked)',
      accessor: 'phone',
      render: (row) => (
        <span className="font-mono text-xs text-slate-500">
          {row.phone}
        </span>
      ),
    },
    {
      header: 'Action',
      align: 'right',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedStudent(row)}
          leftIcon={Eye}
        >
          Profile
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Student Directory
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprehensive roster of all DCRUST students registered for campus placement cycles.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by student name, roll number, or email..."
          className="flex-1"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Filter
            label="Branch"
            value={branch}
            onChange={setBranch}
            options={BRANCH_OPTIONS}
          />
          <Filter
            label="Batch"
            value={batch}
            onChange={setBatch}
            options={BATCH_OPTIONS}
          />
        </div>
      </div>

      {/* Table view */}
      {isLoading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : error ? (
        <ErrorState
          title="Unable to load students"
          message="Could not retrieve student cohort."
          onRetry={refetch}
        />
      ) : students.length === 0 ? (
        <EmptyState
          icon={User}
          title="No students matched criteria"
          description="Try broadening your search query or filters."
        />
      ) : (
        <Table columns={columns} data={students} />
      )}

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile — ${selectedStudent.name}`}
          subtitle={`Roll No: ${selectedStudent.rollNumber} • ${selectedStudent.branch}`}
          maxWidth="max-w-xl"
          footer={
            <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-semibold block">Full Name</span>
                <span className="font-semibold text-slate-800 text-sm">{selectedStudent.name}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-semibold block">Registration No</span>
                <span className="font-mono text-slate-800">{selectedStudent.registrationNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-semibold block">Academic Branch</span>
                <span className="font-semibold text-indigo-700">{selectedStudent.branch}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-semibold block">Graduating Batch</span>
                <span className="text-slate-800 font-medium">{selectedStudent.batch}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-semibold block">Current CGPA</span>
                <span className="text-slate-800 font-bold">{selectedStudent.cgpa} / 10.0</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-semibold block">Active Backlogs</span>
                <span className={`font-bold ${selectedStudent.activeBacklogs === 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {selectedStudent.activeBacklogs}
                </span>
              </div>
            </div>

            {/* Privacy note */}
            <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg text-indigo-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Contact privacy policy active: Direct phone numbers are masked ({selectedStudent.phone}).</span>
            </div>

            {/* Resume Info */}
            <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {selectedStudent.resume?.fileName || 'No Resume on File'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {selectedStudent.resume ? `Skills: ${selectedStudent.resume.skills?.join(', ')}` : 'Student has not uploaded resume'}
                  </span>
                </div>
              </div>
              {selectedStudent.resume && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Uploaded
                </span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StudentManagement;
