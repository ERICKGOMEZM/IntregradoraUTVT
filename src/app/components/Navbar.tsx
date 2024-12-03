// src/components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';


const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
