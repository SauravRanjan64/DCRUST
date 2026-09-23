import axiosClient from './axiosClient';

export const applicationApi = {
  apply: async (jobId) => {
    const res = await axiosClient.post('/applications', { jobId });
    return res.data;
  },

  getMyApplications: async () => {
    const res = await axiosClient.get('/applications/my');
    return res.data;
  },

  getApplicationById: async (id) => {
    const res = await axiosClient.get(`/applications/${id}`);
    return res.data;
  },
};

export default applicationApi;
