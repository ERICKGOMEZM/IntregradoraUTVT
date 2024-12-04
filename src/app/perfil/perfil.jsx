'use client';

import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Typography, CircularProgress } from '@mui/material';

export default function UserProfileForm() {
  const [userData, setUserData] = useState({
    nombre: '',
    edad: '',
    genero: '',
    matricula: '',
    correo: '',
    taller: '', // Nuevo campo para el taller
    cuatrimestre: '', // Nuevo campo para cuatrimestre
    carrera: '', // Nuevo campo para carrera
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || !user.id_alumno || !token) {
          setError('No se encontró el usuario o no está autenticado.');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:86/api/auth/profile/${user.id_alumno}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Error al obtener los datos del usuario');
          return;
        }

        const data = await response.json();
        setUserData({ ...data.user, ...data.talleres[0] }); // Asignamos los datos del primer taller
      } catch (error) {
        setError('Error en la solicitud: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, p: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" component="p" mt={2}>
          Cargando perfil...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Nombre Completo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.nombre}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Edad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.edad}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Género"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.genero}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Matrícula"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.matricula}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Correo"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.correo}
          InputProps={{
            readOnly: true,
          }}
        />
        {/* Nuevos campos para los talleres */}
        <TextField
          label="Taller"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.taller || 'No registrado'}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Cuatrimestre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.cuatrimestre || 'No disponible'}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Carrera"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.carrera || 'No disponible'}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Container>
  );
}
