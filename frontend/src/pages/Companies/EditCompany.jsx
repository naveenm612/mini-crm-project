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
} from '@mui/material';

import { companiesAPI } from '../../api/companies.api';

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState({
    name: '',
    industry: '',
    location: '',
    website: '',
    phone: '',
    description: '',
  });

  /* ---------------- FETCH COMPANY ---------------- */
  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await companiesAPI.getCompany(id);
      if (res.success) {
        setCompany({
          name: res.data.company.name || '',
          industry: res.data.company.industry || '',
          location: res.data.company.location || '',
          website: res.data.company.website || '',
          phone: res.data.company.phone || '',
          description: res.data.company.description || '',
        });
      }
    } catch (err) {
      alert('Failed to load company details');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  /* ---------------- UPDATE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await companiesAPI.updateCompany(id, company);
      navigate('/companies');
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
          Edit Company
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Company Name"
            name="name"
            fullWidth
            required
            value={company.name}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Industry"
            name="industry"
            fullWidth
            value={company.industry}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Location"
            name="location"
            fullWidth
            value={company.location}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Website"
            name="website"
            fullWidth
            value={company.website}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={company.phone}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={company.description}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/companies')}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Update Company
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditCompany;
