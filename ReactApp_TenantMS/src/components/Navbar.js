import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Multi-Tenant Management
        </Typography>
        <Button color="inherit" component={Link} to="/organizations">Organizations</Button>
        <Button color="inherit" component={Link} to="/clients">Clients</Button>
        <Button color="inherit" component={Link} to="/projects">Projects</Button>
        <Button color="inherit" component={Link} to="/reports">Reports</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;