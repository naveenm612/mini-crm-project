import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

import Dashboard from '../pages/Dashboard';
import LeadsList from '../pages/Leads/LeadsList';
import LeadForm from '../pages/Leads/LeadForm';
import CompaniesList from '../pages/Companies/CompaniesList';
import CompanyForm from '../pages/Companies/CompanyForm';
import CompanyDetail from '../pages/Companies/CompanyDetail';
import TasksList from '../pages/Tasks/TasksList';
import TaskForm from '../pages/Tasks/TaskForm';

const AppRoutes = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Topbar />
        <Toolbar />

        <Routes>
          {/* Default */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Leads */}
          <Route path="/leads" element={<LeadsList />} />
          <Route path="/leads/new" element={<LeadForm />} />
          <Route path="/leads/edit/:id" element={<LeadForm />} />

          {/* Companies */}
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/companies/new" element={<CompanyForm />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />

          {/* Tasks */}
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/tasks/new" element={<TaskForm />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AppRoutes;
