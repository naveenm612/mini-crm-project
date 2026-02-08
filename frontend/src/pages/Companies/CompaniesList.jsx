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
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { companiesAPI } from '../../api/companies.api';

const ITEMS_PER_PAGE = 10;

const CompaniesList = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);

  // delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companiesAPI.getCompanies();
      if (response.success) {
        setCompanies(response.data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- PAGINATION LOGIC ---------------- */

  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);

  const paginatedCompanies = companies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  /* ---------------- DELETE ---------------- */

  const openDeleteDialog = (id) => {
    setSelectedCompanyId(id);
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedCompanyId(null);
    setDeleteOpen(false);
  };

  const confirmDeleteCompany = async () => {
    try {
      await companiesAPI.deleteCompany(selectedCompanyId);
      closeDeleteDialog();
      fetchCompanies();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Companies
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/companies/new')}
        >
          Add Company
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
                  <TableCell>Company Name</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No companies found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCompanies.map((company) => (
                    <TableRow key={company._id} hover>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.industry || '-'}</TableCell>
                      <TableCell>{company.location || '-'}</TableCell>

                      {/* ACTIONS */}
                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(`/companies/${company._id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton
                            color="info"
                            onClick={() =>
                              navigate(`/companies/edit/${company._id}`)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() =>
                              openDeleteDialog(company._id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
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
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this company?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="inherit">
            No
          </Button>
          <Button
            onClick={confirmDeleteCompany}
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

export default CompaniesList;
