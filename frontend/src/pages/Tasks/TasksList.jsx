import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { tasksAPI } from '../../api/tasks.api';
import { useAuth } from '../../context/AuthContext';

const statusColors = {
  Pending: 'warning',
  'In Progress': 'info',
  Completed: 'success',
};

const ITEMS_PER_PAGE = 10;

const TasksList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);

  // delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------------- FETCH ---------------- */

  const fetchTasks = async () => {
    try {
      const res = await tasksAPI.getTasks();
      if (res.success) setTasks(res.data);
    } catch (err) {
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  const paginatedTasks = tasks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  /* ---------------- ACTIONS ---------------- */

  const handleUpdateStatus = async (taskId, status) => {
    try {
      await tasksAPI.updateTaskStatus(taskId, status);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed');
    }
  };

  const openDeleteDialog = (taskId) => {
    setSelectedTaskId(taskId);
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedTaskId(null);
    setDeleteOpen(false);
  };

  const confirmDeleteTask = async () => {
    try {
      await tasksAPI.deleteTask(selectedTaskId);
      closeDeleteDialog();
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Tasks
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/tasks/new')}
        >
          Add Task
        </Button>
      </Box>

      {/* LOADING */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Lead</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTasks.map((task) => {
                    const isAssignedUser =
                      user?._id === task.assignedTo?._id;

                    return (
                      <TableRow key={task._id} hover>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.lead}</TableCell>
                        <TableCell>{formatDate(task.dueDate)}</TableCell>

                        <TableCell>
                          <Chip
                            label={task.status}
                            color={statusColors[task.status]}
                            size="small"
                          />
                        </TableCell>

                        <TableCell>{task.assignedTo}</TableCell>

                        {/* ACTIONS */}
                        <TableCell align="right">
                          {isAssignedUser && (
                            <>
                              {/* COMPLETE */}
                              {task.status !== 'Completed' && (
                                <Tooltip title="Mark Completed">
                                  <IconButton
                                    color="success"
                                    onClick={() =>
                                      handleUpdateStatus(
                                        task._id,
                                        'Completed'
                                      )
                                    }
                                  >
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>
                              )}

                              {/* PENDING */}
                              {task.status === 'Completed' && (
                                <Tooltip title="Mark Pending">
                                  <IconButton
                                    color="warning"
                                    onClick={() =>
                                      handleUpdateStatus(
                                        task._id,
                                        'Pending'
                                      )
                                    }
                                  >
                                    <PendingIcon />
                                  </IconButton>
                                </Tooltip>
                              )}

                              {/* EDIT */}
                              <Tooltip title="Edit Task">
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    navigate(`/tasks/edit/${task._id}`)
                                  }
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>

                              {/* DELETE */}
                              <Tooltip title="Delete Task">
                                <IconButton
                                  color="error"
                                  onClick={() =>
                                    openDeleteDialog(task._id)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={deleteOpen}
        onClose={closeDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="inherit">
            No
          </Button>
          <Button
            onClick={confirmDeleteTask}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TasksList;
