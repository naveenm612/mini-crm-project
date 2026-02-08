// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tooltip,
// } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useAuth } from '../context/AuthContext';

// const drawerWidth = 240;

// const Topbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);

//   // Open confirmation dialog
//   const handleLogoutClick = () => {
//     setOpen(true);
//   };

//   // Close dialog
//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Confirm logout
//   const handleConfirmLogout = () => {
//     logout();
//     setOpen(false);
//     navigate('/login');
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: `calc(100% - ${drawerWidth}px)`,
//           ml: `${drawerWidth}px`,
//           backgroundColor: 'white',
//           color: 'text.primary',
//           boxShadow: 1,
//         }}
//       >
//         <Toolbar>
//           <Box sx={{ flexGrow: 1 }} />
//           <Typography variant="body1" sx={{ mr: 2 }}>
//             {user?.name || user?.email}
//           </Typography>
//           <Tooltip title="Logout">
//             <Button
//               color="inherit"
//               onClick={handleLogoutClick}
//               startIcon={<LogoutIcon />}
//             >
//             </Button>
//           </Tooltip>
//         </Toolbar>
//       </AppBar>

//       {/* 🔔 Logout Confirmation Dialog */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Confirm Logout</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to logout?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="inherit">
//             No
//           </Button>
//           <Button
//             onClick={handleConfirmLogout}
//             color="error"
//             variant="contained"
//           >
//             Yes, Logout
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Topbar;




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  Badge,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const confirmLogout = () => {
    logout();
    setOpenDialog(false);
    navigate('/login');
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side */}
          <Typography variant="h6" fontWeight={600}>
            Mini CRM
          </Typography>

          {/* Right Side */}
          <Box display="flex" alignItems="center" gap={2}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Info */}
            <Tooltip title="Account">
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: 'pointer' }}
                onClick={handleMenuOpen}
              >
                <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  {user?.name || user?.email}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: { minWidth: 180 },
        }}
      >
        <MenuItem disabled>
          <AccountCircleIcon sx={{ mr: 1 }} />
           {user?.name || user?.email}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Logout Confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Topbar;
