// src/app/vistaFutbol/sidebard.tsx

'use client';  // Asegúrate de agregar esto

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';  // Cambiar importación
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './vistaFutbol.module.css';  // Importar estilos

const Sidebar = () => {
  const router = useRouter();  // Usar el enrutador de next/navigation
  const [open, setOpen] = useState(true);  // Estado para el sidebar

  const toggleSidebar = () => setOpen(!open);

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <IconButton onClick={toggleSidebar}>
        <ChevronLeftIcon />
      </IconButton>
      <List>
        <ListItem button onClick={() => router.push('/talleres/vistaFutbol')}>
          <ListItemText primary="Vista Fútbol" />
        </ListItem>
        <ListItem button onClick={() => router.push('/talleres/vistaBasquetbol')}>
          <ListItemText primary="Vista Básquetbol" />
        </ListItem>
        {/* Agrega más elementos de navegación según sea necesario */}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
