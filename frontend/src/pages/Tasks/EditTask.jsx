import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  MenuItem,
} from '@mui/material';

import { tasksAPI } from '../../api/tasks.api';
import { usersAPI } from '../../api/users.api'; // 👈 users list

const statusOptions = ['Pending', 'In Progress', 'Completed'];

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [task, setTask] = useState({
    title: '',
    lead: '',
    dueDate: '',
    status: 'Pending',
  });

  /* ---------------- FETCH TASK + USERS ---------------- */
  useEffect(() => {
    Promise.all([fetchTask(), fetchUsers()]);
  }, []);

  const fetchTask = async () => {
    try {
      const res = await tasksAPI.getTaskById(id);
      if (res.success) {
        setTask({
          title: res.data.title,
          lead: res.data.lead,
          dueDate: res.data.dueDate.slice(0, 10),
          status: res.data.status,
        });
      }
    } catch (err) {
      alert('Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await usersAPI.getUsers();
      if (res.success) setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users');
    }
  };

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  /* ---------------- UPDATE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await tasksAPI.updateTask(id, task);
      navigate('/tasks');
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Edit Task
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* TITLE */}
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            value={task.title}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* LEAD */}
          <TextField
            label="Lead"
            name="lead"
            fullWidth
            required
            value={task.lead}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* DUE DATE */}
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={task.dueDate}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* STATUS */}
          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            value={task.status}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          {/* ACTIONS */}
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/tasks')}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Update Task
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditTask;
