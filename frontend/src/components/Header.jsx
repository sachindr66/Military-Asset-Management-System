import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => location.pathname === path;

  const drawerItems = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={Link} to="/dashboard" selected={isActive('/dashboard')}>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {(role === 'Admin' || role === 'Logistics Officer') && (
          <ListItem button component={Link} to="/purchases" selected={isActive('/purchases')}>
            <ListItemText primary="Purchases" />
          </ListItem>
        )}

        {(role === 'Admin' || role === 'Logistics Officer') && (
          <ListItem button component={Link} to="/transfers" selected={isActive('/transfers')}>
            <ListItemText primary="Transfers" />
          </ListItem>
        )}

        {(role === 'Admin' || role === 'Base Commander') && (
          <ListItem button component={Link} to="/assignments" selected={isActive('/assignments')}>
            <ListItemText primary="Assignments" />
          </ListItem>
        )}

        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Military Asset Management System
          </Typography>

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{
                bgcolor: isActive('/dashboard') ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              Dashboard
            </Button>

            {(role === 'Admin' || role === 'Logistics Officer') && (
              <Button
                color="inherit"
                component={Link}
                to="/purchases"
                sx={{
                  bgcolor: isActive('/purchases') ? 'rgba(255,255,255,0.2)' : 'transparent',
                }}
              >
                Purchases
              </Button>
            )}

            {(role === 'Admin' || role === 'Logistics Officer') && (
              <Button
                color="inherit"
                component={Link}
                to="/transfers"
                sx={{
                  bgcolor: isActive('/transfers') ? 'rgba(255,255,255,0.2)' : 'transparent',
                }}
              >
                Transfers
              </Button>
            )}

            {(role === 'Admin' || role === 'Base Commander') && (
              <Button
                color="inherit"
                component={Link}
                to="/assignments"
                sx={{
                  bgcolor: isActive('/assignments') ? 'rgba(255,255,255,0.2)' : 'transparent',
                }}
              >
                Assignments
              </Button>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawerItems}
      </Drawer>
    </>
  );
};

export default Header;
