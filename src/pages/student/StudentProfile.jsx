import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import studentApi from '../../services/studentApi';
import { useToast } from '../../contexts/ToastContext';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { ProfileSkeleton } from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import { Link } from 'react-router-dom';
import { FileText, Save, CheckCircle2, AlertCircle } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  rollNumber: z.string().min(5, 'Roll number is required'),
  registrationNumber: z.string().min(5, 'Registration number is required'),
  branch: z.string().min(1, 'Please select your academic branch'),
  batch: z.coerce.number().min(2020).max(2030),
  semester: z.coerce.number().min(1).max(8),
  cgpa: z.coerce.number().min(0).max(10, 'CGPA must be between 0.0 and 10.0'),
  activeBacklogs: z.coerce.number().min(0, 'Backlogs cannot be negative'),
  phone: z.string().min(10, 'Valid 10-digit Indian phone number required'),
  email: z.string().email('Invalid university email address'),
  graduationYear: z.coerce.number().min(2020).max(2030),
});

const BRANCH_OPTIONS = [
  { value: 'CSE', label: 'Computer Science & Engineering (CSE)' },
  { value: 'IT', label: 'Information Technology (IT)' },
  { value: 'ECE', label: 'Electronics & Communication Engineering (ECE)' },
  { value: 'EEE', label: 'Electrical & Electronics Engineering (EEE)' },
  { value: 'Electrical', label: 'Electrical Engineering' },
  { value: 'Mechanical', label: 'Mechanical Engineering (ME)' },
  { value: 'Civil', label: 'Civil Engineering' },
  { value: 'Biotechnology', label: 'Biotechnology Engineering' },
  { value: 'Other', label: 'Other Specialization' },
];

const BATCH_OPTIONS = [
  { value: '2024', label: 'Batch 2024' },
  { value: '2025', label: 'Batch 2025' },
  { value: '2026', label: 'Batch 2026' },
  { value: '2027', label: 'Batch 2027' },
];

const SEMESTER_OPTIONS = [
  { value: '1', label: '1st Semester' },
  { value: '2', label: '2nd Semester' },
  { value: '3', label: '3rd Semester' },
  { value: '4', label: '4th Semester' },
  { value: '5', label: '5th Semester' },
  { value: '6', label: '6th Semester' },
  { value: '7', label: '7th Semester' },
  { value: '8', label: '8th Semester' },
];

const BACKLOG_OPTIONS = [
  { value: '0', label: '0 (No active backlogs)' },
  { value: '1', label: '1 Active Backlog' },
  { value: '2', label: '2 Active Backlogs' },
  { value: '3', label: '3 Active Backlogs' },
  { value: '4', label: '4+ Active Backlogs' },
];

export const StudentProfile = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['student-profile'],
    queryFn: () => studentApi.getProfile(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const student = data?.student;

  useEffect(() => {
    if (student) {
      reset({
        name: student.name || '',
        rollNumber: student.rollNumber || '',
        registrationNumber: student.registrationNumber || '',
        branch: student.branch || 'CSE',
        batch: student.batch || 2025,
        semester: student.semester || 7,
        cgpa: student.cgpa || 0.0,
        activeBacklogs: student.activeBacklogs || 0,
        phone: student.phone || '',
        email: student.email || '',
        graduationYear: student.graduationYear || 2025,
      });
    }
  }, [student, reset]);

  const updateMutation = useMutation({
    mutationFn: (updatedData) => studentApi.updateProfile(updatedData),
    onSuccess: (res) => {
      showToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your placement profile has been successfully saved.',
      });
      queryClient.invalidateQueries({ queryKey: ['student-profile'] });
    },
    onError: (err) => {
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: err.response?.data?.message || 'Could not save profile changes.',
      });
    },
  });

  const onSubmit = (formData) => {
    updateMutation.mutate(formData);
  };

  if (isLoading) return <ProfileSkeleton />;
  if (error) {
    return (
      <ErrorState
        title="Unable to load profile"
        message="Could not retrieve your student academic record."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Student Academic Profile
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Verify and keep your academic credentials up to date. These details determine your eligibility across campus placement drives.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal & University Identifiers */}
        <Card title="University Identification" subtitle="Official registration credentials">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              {...register('name')}
              error={errors.name?.message}
              required
              placeholder="e.g. Rahul Sharma"
            />
            <Input
              label="University Roll Number"
              {...register('rollNumber')}
              error={errors.rollNumber?.message}
              required
              placeholder="e.g. 21001001045"
            />
            <Input
              label="University Registration Number"
              {...register('registrationNumber')}
              error={errors.registrationNumber?.message}
              required
              placeholder="e.g. 21DCRUST045"
            />
            <Input
              label="University Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              required
              placeholder="rollnumber@dcrust.ac.in"
            />
          </div>
        </Card>

        {/* Academic Details */}
        <Card title="Academic Performance & Branch" subtitle="Used for automatic placement drive eligibility checking">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Select
              label="Branch"
              options={BRANCH_OPTIONS}
              {...register('branch')}
              error={errors.branch?.message}
              required
            />
            <Select
              label="Batch"
              options={BATCH_OPTIONS}
              {...register('batch')}
              error={errors.batch?.message}
              required
            />
            <Select
              label="Current Semester"
              options={SEMESTER_OPTIONS}
              {...register('semester')}
              error={errors.semester?.message}
              required
            />
            <Input
              label="Cumulative CGPA (out of 10.0)"
              type="number"
              step="0.01"
              {...register('cgpa')}
              error={errors.cgpa?.message}
              required
              placeholder="e.g. 8.25"
            />
            <Select
              label="Active Backlogs"
              options={BACKLOG_OPTIONS}
              {...register('activeBacklogs')}
              error={errors.activeBacklogs?.message}
              required
            />
            <Select
              label="Graduation Year"
              options={BATCH_OPTIONS}
              {...register('graduationYear')}
              error={errors.graduationYear?.message}
              required
            />
          </div>
        </Card>

        {/* Contact & Resume Attachment */}
        <Card title="Contact & Resume" subtitle="Your active contact information and linked CV">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <Input
              label="Mobile Phone Number"
              {...register('phone')}
              error={errors.phone?.message}
              required
              placeholder="e.g. +91 9876543210"
              helperText="Visible to recruiters only after authorized shortlisting"
            />

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block truncate max-w-[180px]">
                    {student?.resume?.fileName || 'No Resume Uploaded'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {student?.resume ? `Uploaded ${student.resume.uploadDate}` : 'Required for job applications'}
                  </span>
                </div>
              </div>
              <Link to="/student/resume">
                <Button variant="outline" size="sm">
                  {student?.resume ? 'Manage' : 'Upload'}
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={updateMutation.isPending}
            leftIcon={Save}
          >
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
