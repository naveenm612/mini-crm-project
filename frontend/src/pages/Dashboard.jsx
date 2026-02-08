import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CssBaseline,
  CircularProgress,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { dashboardAPI } from '../api/dashboard.api';

/* ---------------- LIGHT THEME ---------------- */
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f6fb',
      paper: '#ffffff',
    },
    primary: { main: '#2563eb' },
    success: { main: '#16a34a' },
    warning: { main: '#f59e0b' },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
});

/* ---------------- STATIC PERFORMANCE DATA ---------------- */
/* ❗ Performance chart is intentionally static as requested */
const chartData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 70 },
  { month: 'Mar', value: 90 },
  { month: 'Apr', value: 70 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 60 },
  { month: 'Jul', value: 75 },
  { month: 'Aug', value: 60 },
  { month: 'Sep', value: 90 },
  { month: 'Oct', value: 80 },
  { month: 'Nov', value: 110 },
  { month: 'Dec', value: 100 },
];

/* ---------------- COMPONENT ---------------- */
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCompanies: 0,
    totalTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await dashboardAPI.getDashboardStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- STAT CARD ---------------- */
  const StatCard = ({ title, value, icon, color }) => (
    <Paper
      sx={{
        p: 3,
        height: 140,
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography color="text.secondary" fontWeight={500}>
          {title}
        </Typography>

        <Box
          sx={{
            backgroundColor: `${color}.main`,
            color: '#fff',
            p: 1.2,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>

      <Typography variant="h4" fontWeight="bold" mt={2}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Performance Dashboard
        </Typography>

        {/* PERFORMANCE CHART (UNCHANGED) */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            height: 320,
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="h6" mb={2}>
            Performance
          </Typography>

          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={chartData}>
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* STATS */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Total Leads"
                value={stats.totalLeads}
                icon={<PeopleIcon />}
                color="primary"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Total Companies"
                value={stats.totalCompanies}
                icon={<BusinessIcon />}
                color="success"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Total Tasks"
                value={stats.totalTasks}
                icon={<TaskAltIcon />}
                color="warning"
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}
