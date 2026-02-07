import axios from './axios';

export const companiesAPI = {
  getCompanies: async () => {
    const response = await axios.get('/companies');
    return response.data;
  },

  getCompany: async (id) => {
    const response = await axios.get(`/companies/${id}`);
    return response.data;
  },

  createCompany: async (companyData) => {
    const response = await axios.post('/companies', companyData);
    return response.data;
  },

  updateCompany: async (id, companyData) => {
    const response = await axios.put(`/companies/${id}`, companyData);
    return response.data;
  },

  deleteCompany: async (id) => {
    const response = await axios.delete(`/companies/${id}`);
    return response.data;
  },
};
