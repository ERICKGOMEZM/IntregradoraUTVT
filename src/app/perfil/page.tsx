// page.tsx
import React from 'react';
import UserProfileForm from '../perfil/perfil'; // Asegúrate de que la ruta sea correcta
import { Box, Typography } from '@mui/material';

export default function Page() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Perfil de Alumno
      </Typography>
      <UserProfileForm />
    </Box>
  );
}
