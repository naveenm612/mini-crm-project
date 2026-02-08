import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoute';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import LeadsList from '../pages/Leads/LeadsList';
import LeadForm from '../pages/Leads/LeadForm';
import CompaniesList from '../pages/Companies/CompaniesList';
import CompanyForm from '../pages/Companies/CompanyForm';
import CompanyDetail from '../pages/Companies/CompanyDetail';
import TasksList from '../pages/Tasks/TasksList';
import EditTask from '../pages/Tasks/EditTask';
import TaskForm from '../pages/Tasks/TaskForm';
import EditCompany from '../pages/Companies/EditCompany';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes with layout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Box sx={{ display: 'flex' }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Topbar />
                <Toolbar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* Leads routes */}
                  <Route path="/leads" element={<LeadsList />} />
                  <Route path="/leads/new" element={<LeadForm />} />
                  <Route path="/leads/edit/:id" element={<LeadForm />} />
                  
                  {/* Companies routes */}
                  <Route path="/companies" element={<CompaniesList />} />
                  <Route path="/companies/new" element={<CompanyForm />} />
                  <Route path="/companies/:id" element={<CompanyDetail />} />
                  <Route path="/companies/edit/:id" element={<EditCompany />} />
                  
                  {/* Tasks routes */}
                  <Route path="/tasks" element={<TasksList />} />
                  <Route path="/tasks/new" element={<TaskForm />} />
                  <Route path="/tasks/edit/:id" element={<EditTask />} />
                  
                  {/* Default redirect */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Box>
            </Box>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
