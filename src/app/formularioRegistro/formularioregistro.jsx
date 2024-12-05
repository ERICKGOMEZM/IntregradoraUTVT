'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './formularioregistro.module.css';
import BasicSelectCuatrimestre from './BasicSelectCuatrimestre';
import BasicSelectCarrera from './BasicSelectCarrera';
import BasicSelectTaller from './BasicSelectTaller';
import BasicSelectPadecimiento from './BasicSelectPadecimiento'; // Importamos el nuevo select
import Box from '@mui/material/Box';
import { Button, Modal, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const RegisterForm = () => {
  const [tallerSeleccionado, setTallerSeleccionado] = useState('');
  const [cuatrimestreSeleccionado, setCuatrimestreSeleccionado] = useState('');
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('');
  const [padecimientoSeleccionado, setPadecimientoSeleccionado] = useState('');
  const [descripcionPadecimiento, setDescripcionPadecimiento] = useState('');
  const [openModal, setOpenModal] = useState(false); // Estado para abrir el modal
  const router = useRouter();

  const handleTallerChange = (selectedTaller) => {
    setTallerSeleccionado(selectedTaller);
  };

  const handleCuatrimestreChange = (selectedCuatrimestre) => {
    setCuatrimestreSeleccionado(selectedCuatrimestre);
  };

  const handleCarreraChange = (selectedCarrera) => {
    setCarreraSeleccionada(selectedCarrera);
  };

  const handlePadecimientoChange = (selectedPadecimiento) => {
    setPadecimientoSeleccionado(selectedPadecimiento);
    setOpenModal(true); // Abrimos el modal para la descripción
  };

  const handleDescripcionChange = (event) => {
    setDescripcionPadecimiento(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Cerrar el modal
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones antes de enviar los datos
    if (!cuatrimestreSeleccionado || !carreraSeleccionada || !tallerSeleccionado) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
      });
      console.log('Error: Datos incompletos');
      return;
    }

    const formData = {
      cuatrimestre: cuatrimestreSeleccionado,
      carrera: carreraSeleccionada,
      taller: tallerSeleccionado,
      padecimiento: padecimientoSeleccionado || null,
      descripcion: descripcionPadecimiento || null,
    };

    console.log("Datos del formulario antes de enviarlo:", formData);

    // Obtener el token del usuario
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'No estás autenticado. Por favor, inicia sesión.',
      });
      console.log('Error: No hay token de autenticación');
      return;
    }

    // Enviar los datos del formulario y el token al backend
    try {
      console.log("Enviando solicitud al backend...");
      const response = await fetch('http://localhost:8080/api/register-taller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Añadir el token en los headers
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Ver los datos que devuelve el servidor

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: data.message,  // Mostrar mensaje de éxito
        }).then(() => {
          // Mostrar detalles de la respuesta (opcional)
          console.log("Taller registrado:", data.data.taller);
          if (data.data.padecimiento) {
            console.log("Padecimiento registrado:", data.data.padecimiento);
          }
          console.log('Padecimiento seleccionado antes de enviar:', padecimientoSeleccionado);

          window.location.href = '/sidebar'; // Redirigir a otra página después del éxito
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: data.message,  // Mostrar mensaje de error
        });
      }
    } catch (error) {
      console.error('Error al registrar en el taller:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Hubo un problema al registrarse en el taller',
      });
    }
  };

  return (
    <div className={styles.registerContainer}>
      {/* Botón para regresar */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push('/sidebar')}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        }}
      >
        Regresar
      </Button>
      <h5 className={styles.title}>Registrarse a un taller</h5>
      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Selección de cuatrimestre */}
        <div className={styles.inputContainer}>
          <Box component="div" sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
            <BasicSelectCuatrimestre onChange={handleCuatrimestreChange} color="warning" />
          </Box>
        </div>

        {/* Selección de carrera */}
        <div className={styles.inputContainer}>
          <Box component="div" sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
            <BasicSelectCarrera onChange={handleCarreraChange} color="warning" />
          </Box>
        </div>

        {/* Selección de taller */}
        <div className={styles.inputContainer}>
          <Box component="div" sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
            <BasicSelectTaller onChange={handleTallerChange} color="warning" />
          </Box>
        </div>

        {/* Selección de padecimiento con modal */}
        <div className={styles.inputContainer}>
          <Box component="div" sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
            <BasicSelectPadecimiento onChange={handlePadecimientoChange} color="warning" />
          </Box>
        </div>

        <button type="submit" variant="contained" color="warning" className={styles.submitButton}>Registrarse</button>
      </form>

      {/* Modal para agregar la descripción del padecimiento */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: '20px', boxShadow: 24, width: 400, borderRadius: 2
        }}>
          <Typography id="modal-title" variant="h6" component="h2">Agregar una Descripción</Typography>
          <TextField
            id="descripcion-padecimiento"
            label="Descripción"
            multiline
            rows={4}
            fullWidth
            value={descripcionPadecimiento}
            onChange={handleDescripcionChange}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleCloseModal} variant="outlined">Cancelar</Button>
            <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ ml: 2 }}>Guardar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterForm;
