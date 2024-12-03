// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
          },
        }}
      >
        <List>
          <ListItem component={Link} href="/talleres/futbol">
            <ListItemText primary="Fútbol" />
          </ListItem>
          <Divider />
          <ListItem  component={Link} href="/talleres/basquetbol">
            <ListItemText primary="Básquetbol" />
          </ListItem>
          <Divider />
          <ListItem component={Link} href="/talleres/voleibol">
            <ListItemText primary="Voleibol" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
