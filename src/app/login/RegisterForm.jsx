'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField'; // Importa TextField de Material UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    edad: '',
    genero: 'female',
    matricula: '',
    correo: '',
    contraseña: '',
  });

  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setError(null);

    try {
      const response = await fetch('http://localhost:86/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado exitosamente',
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/login');
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h5 className={styles.title}>Registrarse Alumno</h5>
      <p className={styles.subtitle}>
        ¿Ya tienes una cuenta?{' '}
        <a href="/login" className={styles.link}>
          Inicia sesión aquí
        </a>
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <TextField
            id="nombre"
            name="nombre"
            variant="outlined"
            label="Nombre (s)"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            id="apellido_paterno"
            name="apellido_paterno"
            variant="outlined"
            label="Apellido Paterno"
            placeholder="Ingresa tu Apellido Paterno"
            value={formData.apellido_paterno}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            id="apellido_materno"
            name="apellido_materno"
            variant="outlined"
            label="Apellido Materno"
            placeholder="Ingresa tu Apellido Materno"
            value={formData.apellido_materno}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            id="edad"
            name="edad"
            variant="outlined"
            label="Edad"
            placeholder="Ingresa tu edad"
            type="number"
            value={formData.edad}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </div>

        <div className={styles.inputContainer}>
          <FormControl component="fieldset" fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel component="legend">Género</FormLabel>
            <RadioGroup
              aria-labelledby="genero-radio-buttons-group"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Femenino" />
              <FormControlLabel value="male" control={<Radio />} label="Masculino" />
              <FormControlLabel value="other" control={<Radio />} label="Otro" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <TextField
            id="matricula"
            name="matricula"
            variant="outlined"
            label="Matrícula"
            placeholder="Ingresa tu matrícula"
            value={formData.matricula}
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
            label="Correo Institucional"
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

export default RegisterForm;

