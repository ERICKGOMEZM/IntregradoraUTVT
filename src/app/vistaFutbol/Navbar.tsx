'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';  // Importar desde next/navigation

const Navbar = () => {
  const router = useRouter();  // Usar useRouter para redirección

  const handleLogout = () => {
    // Lógica para cerrar sesión
    router.push('/login');  // Redirigir a la página de login
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Taller de Fútbol
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
