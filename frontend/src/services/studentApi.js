import axiosClient from './axiosClient';

export const studentApi = {
  getProfile: async () => {
    const res = await axiosClient.get('/students/profile');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await axiosClient.put('/students/profile', data);
    return res.data;
  },

  getStats: async () => {
    const res = await axiosClient.get('/students/stats');
    return res.data;
  },
};

export default studentApi;
