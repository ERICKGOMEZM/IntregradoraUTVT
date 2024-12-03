'use client';

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, AppBar, Toolbar, IconButton, Typography, useMediaQuery, Badge, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { useRouter } from 'next/navigation';
import styles from './sidebar2.module.css';

// Componente de Badge con menú en el Avatar
const StyledBadge = ({ onAvatarClick }) => (
  <Badge
    overlap="circular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    variant="dot"
    sx={{
      '.MuiBadge-dot': {
        backgroundColor: '#44b700', // Color verde para el estado activo
      },
    }}
  >
    <Avatar
      alt="Usuario"
      src="/static/images/avatar/1.jpg"
      onClick={onAvatarClick} // Agregar función para abrir el menú
      style={{ cursor: 'pointer' }}
    />
  </Badge>
);

const Sidebar2 = () => {
  const [mobileOpen, setMobileOpen] = useState(false); // Estado para controlar la apertura/cierre del Drawer
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // Estado para el menú del Avatar
  const router = useRouter();

  // Lista de talleres con sus respectivos íconos
  const talleres = [
    { name: 'Taller de Fútbol', icon: <SportsSoccerIcon /> },
    { name: 'Taller de Voleibol', icon: <SportsVolleyballIcon /> },
    { name: 'Taller de Basquetbol', icon: <SportsBasketballIcon /> },
    { name: 'Taller de Activación Física', icon: <SportsGymnasticsIcon /> },
    { name: 'Taller de Tocho Bandera', icon: <SportsHandballIcon /> },
    { name: 'Taller de Artes Visuales', icon: <CameraAltIcon /> },
    { name: 'Taller de Danza y Baile', icon: <SportsGymnasticsIcon /> },
    { name: 'Taller de Ortografía y Redacción', icon: <TextFieldsIcon /> },
    { name: 'Taller de Teatro', icon: <TheaterComedyIcon /> },
    { name: 'Taller de Rondalla', icon: <AudiotrackIcon /> },
  ];

  const handleTallerClick = (taller) => {
    router.push(`/taller/${taller}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAvatarClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleProfileClick = () => {
    router.push('/perfil');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    console.log('Cerrar sesión');
    router.push('/login');
    handleMenuClose();
  };

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <div className={styles.bodyContent}>
      {/* Navbar */}
      <AppBar className={styles.MuiAppBarRoot} position="fixed">
        <Toolbar>
          {isMobile ? (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Typography variant="h6" noWrap>
              Bienvenido
            </Typography>
          )}

          {/* Avatar con Badge y menú */}
          <div style={{ marginLeft: 'auto' }}>
            <StyledBadge onAvatarClick={handleAvatarClick} />
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Cerrar sesión</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <nav>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              marginTop: '64px',
            },
          }}
          variant={isMobile ? 'temporary' : 'permanent'}
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <List>
            {talleres.map((taller, index) => (
              <ListItem button key={index} onClick={() => handleTallerClick(taller.name)}>
                <ListItemIcon>{taller.icon}</ListItemIcon>
                <ListItemText primary={taller.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>

      {/* Contenido principal */}
      <main style={{ paddingLeft: isMobile ? '0' : '240px', marginTop: '64px' }}>
        <h2>Contenido del taller seleccionado</h2>
      </main>
    </div>
  );
};

export default Sidebar2;
