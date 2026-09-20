import axiosClient from './axiosClient';

export const jobApi = {
  getJobs: async (params = {}) => {
    const res = await axiosClient.get('/jobs', { params });
    return res.data;
  },

  getJobById: async (id) => {
    const res = await axiosClient.get(`/jobs/${id}`);
    return res.data;
  },

  checkEligibility: async (id) => {
    const res = await axiosClient.get(`/jobs/${id}/eligibility`);
    return res.data;
  },
};

export default jobApi;
