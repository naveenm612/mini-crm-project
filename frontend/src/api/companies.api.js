import api from './axios';

export const companiesAPI = {
  getCompanies: async () => {
    const res = await api.get('/companies');
    return res.data;
  },

  getCompany: async (id) => {
    const res = await api.get(`/companies/${id}`);
    return res.data;
  },

  createCompany: async (data) => {
    const res = await api.post('/companies', data);
    return res.data;
  },

  updateCompany: async (id, data) => {
    const res = await api.put(`/companies/${id}`, data);
    return res.data;
  },

  deleteCompany: async (id) => {
    const res = await api.delete(`/companies/${id}`);
    return res.data;
  },
};
