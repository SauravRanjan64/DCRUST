import axiosClient from './axiosClient';

export const adminApi = {
  getStats: async () => {
    const res = await axiosClient.get('/admin/stats');
    return res.data;
  },

  getStudents: async (params = {}) => {
    const res = await axiosClient.get('/admin/students', { params });
    return res.data;
  },

  getCompanies: async () => {
    const res = await axiosClient.get('/admin/companies');
    return res.data;
  },

  verifyCompany: async (id) => {
    const res = await axiosClient.patch(`/admin/companies/${id}/verify`);
    return res.data;
  },

  getJobs: async () => {
    const res = await axiosClient.get('/admin/jobs');
    return res.data;
  },

  createJobDrive: async (data) => {
    const res = await axiosClient.post('/admin/jobs', data);
    return res.data;
  },

  getApplications: async (params = {}) => {
    const res = await axiosClient.get('/admin/applications', { params });
    return res.data;
  },

  exportCsv: async (params = {}) => {
    const res = await axiosClient.get('/admin/exports/csv', { params });
    return res.data;
  },

  getAuditLogs: async () => {
    const res = await axiosClient.get('/admin/audit');
    return res.data;
  },
};

export default adminApi;
