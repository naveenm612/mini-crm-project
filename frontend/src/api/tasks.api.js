// import api from './axios';

// export const tasksAPI = {
//   getTasks: async (params) => {
//     const res = await api.get('/tasks', { params });
//     return res.data;
//   },

//   getTask: async (id) => {
//     const res = await api.get(`/tasks/${id}`);
//     return res.data;
//   },

//   createTask: async (data) => {
//     const res = await api.post('/tasks', data);
//     return res.data;
//   },

//   updateTask: async (id, data) => {
//     const res = await api.put(`/tasks/${id}`, data);
//     return res.data;
//   },

//   updateTaskStatus: async (id, status) => {
//     const res = await api.patch(`/tasks/${id}/status`, { status });
//     return res.data;
//   },

//   deleteTask: async (id) => {
//     const res = await api.delete(`/tasks/${id}`);
//     return res.data;
//   },
// };



import api from './axios';

/**
 * Tasks API
 * All methods return `res.data`
 */
export const tasksAPI = {
  /* ---------------- GET ALL TASKS ---------------- */
  getTasks: async (params = {}) => {
    const res = await api.get('/tasks', { params });
    return res.data;
  },

  /* ---------------- GET SINGLE TASK ---------------- */
  getTaskById: async (id) => {
    if (!id) throw new Error('Task ID is required');
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  /* ---------------- CREATE ---------------- */
  createTask: async (data) => {
    const res = await api.post('/tasks', data);
    return res.data;
  },

  /* ---------------- UPDATE FULL TASK ---------------- */
  updateTask: async (id, data) => {
    if (!id) throw new Error('Task ID is required');
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  },

  /* ---------------- UPDATE STATUS ONLY ---------------- */
  updateTaskStatus: async (id, status) => {
    if (!id || !status)
      throw new Error('Task ID and status are required');

    const res = await api.patch(`/tasks/${id}/status`, { status });
    return res.data;
  },

  /* ---------------- DELETE ---------------- */
  deleteTask: async (id) => {
    if (!id) throw new Error('Task ID is required');
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  },
};
