import api from './axios';

export const dashboardAPI = {
  getDashboardStats: async () => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },
};
