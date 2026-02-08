import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';

import { companiesAPI } from '../../api/companies.api';

const statusColors = {
  New: 'info',
  Contacted: 'warning',
  Qualified: 'success',
  Lost: 'error',
  Won: 'success',
};

const InfoItem = ({ icon, label, value }) => (
  <Box display="flex" gap={2} alignItems="flex-start">
    <Box color="primary.main">{icon}</Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value || '-'}
      </Typography>
    </Box>
  </Box>
);

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyDetail();
  }, [id]);

  const fetchCompanyDetail = async () => {
    try {
      const response = await companiesAPI.getCompany(id);
      if (response.success) {
        setCompany(response.data.company);
        setLeads(response.data.leads);
      }
    } catch (error) {
      console.error('Error fetching company detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!company) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Company not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* BACK BUTTON */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/companies')}
        sx={{ mb: 2 }}
      >
        Back to Companies
      </Button>

      {/* COMPANY HEADER */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {company.name}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoItem
              icon={<BusinessIcon />}
              label="Industry"
              value={company.industry}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoItem
              icon={<LocationOnIcon />}
              label="Location"
              value={company.location}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoItem
              icon={<LanguageIcon />}
              label="Website"
              value={company.website}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoItem
              icon={<PhoneIcon />}
              label="Phone"
              value={company.phone}
            />
          </Grid>

          <Grid item xs={12}>
            <InfoItem
              icon={<DescriptionIcon />}
              label="Description"
              value={company.description}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* LEADS SECTION */}
      <Paper
        sx={{
          p: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Leads from this Company
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lead Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No leads available
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead._id} hover>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={lead.status}
                        color={statusColors[lead.status]}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CompanyDetail;
