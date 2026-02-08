import api from './axios';

export const usersAPI = {
  getUsers: async () => {
    const res = await api.get('/users');
    return res.data;
  },
};
