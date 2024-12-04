'use client';
import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import styles from './navbarInstructor.module.css';
import Sidebar from '../sidebar/sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setShowButton(isSmallScreen);
      if (!isSmallScreen) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (isMounted) {
      router.push('/');
    }
  };

  const handleProfile = () => {
    if (isMounted) {
      router.push('');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav className={`${styles.navbar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        {showButton && (
          <button className={styles.menuButton} onClick={toggleSidebar}>
            <MenuIcon />
          </button>
        )}
        <h1 className={styles.title}>Talleres Culturales y Deportivos</h1>
        <ul className={styles.navLinks}>
          <li><a href=""></a></li>
          <li><a href=""></a></li>
          <li><a className={styles.taller}>Taller de Voleibol</a></li>
        </ul>
        
        <div className={styles.avatarContainer}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="/Avatarhombress.jpg"
              onClick={handleMenuOpen}
              style={{ cursor: 'pointer' }}
            />
          </Badge>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfile}>
              <EditIcon fontSize="small" style={{ marginRight: '8px' }} />
              Perfil
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" style={{ marginRight: '8px' }} />
              Salir
            </MenuItem>
          </Menu>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
