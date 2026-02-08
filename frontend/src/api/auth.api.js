import api from './axios';

export const authAPI = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  // ❌ REMOVED — backend does not have these routes
  // getMe: async () => api.get('/auth/me'),
  // getUsers: async () => api.get('/auth/users'),
};
