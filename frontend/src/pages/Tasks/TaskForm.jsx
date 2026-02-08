import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { tasksAPI } from '../../api/tasks.api';
import { useAuth } from '../../context/AuthContext';

const TaskForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // auto-assign to logged-in user

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lead: '',
    assignedTo: user.name, // ✅ auto-filled
    dueDate: '',
    status: 'Pending',
    priority: 'Medium',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.lead || !formData.dueDate) {
      setError('Title, Lead, and Due Date are required');
      return;
    }

    setLoading(true);
    try {
      await tasksAPI.createTask(formData);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add Task
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            margin="normal"
          />

          {/* ✅ Lead as TEXT */}
          <TextField
            fullWidth
            label="Lead Name"
            name="lead"
            value={formData.lead}
            onChange={handleChange}
            required
            margin="normal"
          />

          {/* ✅ Assigned To (read-only) */}
          <TextField
            fullWidth
            label="Assigned To"
            value={formData.assignedTo}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/tasks')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm;
