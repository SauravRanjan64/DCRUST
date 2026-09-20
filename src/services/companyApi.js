import axiosClient from './axiosClient';

export const companyApi = {
  getStats: async () => {
    const res = await axiosClient.get('/company/stats');
    return res.data;
  },

  getCompanyDrives: async () => {
    const res = await axiosClient.get('/company/drives');
    return res.data;
  },

  getApplicants: async (params = {}) => {
    const res = await axiosClient.get('/company/applicants', { params });
    return res.data;
  },

  shortlistApplicant: async (applicationId) => {
    const res = await axiosClient.post(`/company/applications/${applicationId}/shortlist`);
    return res.data;
  },

  rejectApplicant: async (applicationId, reason = '') => {
    const res = await axiosClient.post(`/company/applications/${applicationId}/reject`, { reason });
    return res.data;
  },

  getProfile: async () => {
    const res = await axiosClient.get('/company/profile');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await axiosClient.put('/company/profile', data);
    return res.data;
  },
};

export default companyApi;
