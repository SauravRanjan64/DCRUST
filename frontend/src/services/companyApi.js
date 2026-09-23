import axiosClient from './axiosClient';

export const companyApi = {
  getStats: async () => {
    const res = await axiosClient.get('/companies/stats');
    return res.data;
  },

  getCompanyDrives: async () => {
    const res = await axiosClient.get('/companies/drives');
    return res.data;
  },

  getApplicants: async (params = {}) => {
    const res = await axiosClient.get('/companies/applicants', { params });
    return res.data;
  },

  shortlistApplicant: async (applicationId) => {
    const res = await axiosClient.post(`/companies/applications/${applicationId}/shortlist`);
    return res.data;
  },

  rejectApplicant: async (applicationId, reason = '') => {
    const res = await axiosClient.post(`/companies/applications/${applicationId}/reject`, { reason });
    return res.data;
  },

  getProfile: async () => {
    const res = await axiosClient.get('/companies/profile');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await axiosClient.put('/companies/profile', data);
    return res.data;
  },
};

export default companyApi;
