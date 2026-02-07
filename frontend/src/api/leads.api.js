import axios from './axios';

export const leadsAPI = {
  getLeads: async (params) => {
    const response = await axios.get('/leads', { params });
    return response.data;
  },

  getLead: async (id) => {
    const response = await axios.get(`/leads/${id}`);
    return response.data;
  },

  createLead: async (leadData) => {
    const response = await axios.post('/leads', leadData);
    return response.data;
  },

  updateLead: async (id, leadData) => {
    const response = await axios.put(`/leads/${id}`, leadData);
    return response.data;
  },

  deleteLead: async (id) => {
    const response = await axios.delete(`/leads/${id}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await axios.get('/leads/stats/dashboard');
    return response.data;
  },
};
