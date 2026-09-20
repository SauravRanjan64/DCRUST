import axiosClient from './axiosClient';

export const authApi = {
  login: async (email, password) => {
    const res = await axiosClient.post('/auth/login', { email, password });
    return res.data;
  },

  logout: async () => {
    const res = await axiosClient.post('/auth/logout');
    return res.data;
  },

  getMe: async () => {
    const res = await axiosClient.get('/auth/me');
    return res.data;
  },

  giveConsent: async (agreed = true) => {
    const res = await axiosClient.post('/auth/consent', { agreed });
    return res.data;
  },
};

export default authApi;
