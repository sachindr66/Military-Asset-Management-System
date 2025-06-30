import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          Military Asset Management System
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/purchases">Purchases</Button>
        <Button color="inherit" component={Link} to="/transfers">Transfers</Button>
        <Button color="inherit" component={Link} to="/assignments">Assignments</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
