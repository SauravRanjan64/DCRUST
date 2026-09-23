import axiosClient from './axiosClient';

export const resumeApi = {
  getResume: async () => {
    const res = await axiosClient.get('/resumes');
    return res.data;
  },

  uploadResume: async (file, skills = []) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('skills', JSON.stringify(skills));
    const res = await axiosClient.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  deleteResume: async () => {
    const res = await axiosClient.delete('/resumes');
    return res.data;
  },

  matchResume: async ({ jobId, customSkills }) => {
    const res = await axiosClient.post('/resumes/match', { jobId, customSkills });
    return res.data;
  },
};

export default resumeApi;
