'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';  // Importamos SweetAlert2
import { useRouter } from 'next/navigation';  // Importamos useRouter
import styles from './registerAdmin.module.css'; // Crea un archivo CSS para personalizar

const RegisterAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
  });
  const router = useRouter(); // Inicializamos useRouter

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar datos al backend
    try {
      const response = await fetch('http://localhost:8080/api/admin/register-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Si el registro es exitoso, mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: `Administrador registrado exitosamente: ${data.admin.nombre}`,
        }).then(() => {
          // Redirigir a la página principal después de la alerta
          router.push('/'); // Redirige al home
        });
      } else if (data.error && data.error === 'Usuario ya existe') {
        // Si el usuario ya existe, mostrar alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo ya está registrado.',
        });
      } else {
        // En caso de otros errores
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Hubo un error al registrar al administrador. Intenta nuevamente.',
        });
      }
    } catch (error) {
      console.error('Error al registrar administrador:', error);
      // Si no se puede conectar al servidor, mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al conectar con el servidor.',
      });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Título del formulario */}
        <h2 className={styles.formTitle}>Registro de Administrador</h2>

        <div className={styles.inputContainer}>
          <TextField
            id="nombre"
            name="nombre"
            variant="outlined"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </div>

        <div className={styles.inputContainer}>
          <TextField
            id="correo"
            name="correo"
            variant="outlined"
            label="Correo"
            placeholder="correo@universidad.com"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </div>

        <div className={styles.inputContainer}>
          <TextField
            id="contraseña"
            name="contraseña"
            variant="outlined"
            label="Contraseña"
            placeholder="************"
            type={showPassword ? 'text' : 'password'}
            value={formData.contraseña}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              ),
            }}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterAdminForm;
