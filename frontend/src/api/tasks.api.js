import axios from './axios';

export const tasksAPI = {
  getTasks: async (params) => {
    const response = await axios.get('/tasks', { params });
    return response.data;
  },

  getTask: async (id) => {
    const response = await axios.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await axios.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await axios.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  updateTaskStatus: async (id, status) => {
    const response = await axios.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`/tasks/${id}`);
    return response.data;
  },
};
