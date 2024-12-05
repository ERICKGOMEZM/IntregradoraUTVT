'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './LoginForm.module.css';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [formData, setFormData] = useState({ correo: '', contraseña: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetear el error

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar datos y token
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500,
        });

        router.push('/sidebar'); // Redirige al dashboard
      } else {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }
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
    <div className={styles.loginContainer} style={{ position: 'relative' }}>
      {/* Botón de regresar */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push('/')}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          border: 'none',
          boxShadow: 'none',
          '&:hover': {
            border: 'none',
            boxShadow: 'none',
          },
        }}
      >
        Regresar
      </Button>

      <h5 className={styles.title}>Iniciar sesión Alumno</h5>
      <p className={styles.subtitle}>
        ¿No tienes una cuenta?{' '}
        <a href="/register" className={styles.link}>
          Regístrate aquí
        </a>
      </p>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <TextField
            id="correo"
            name="correo"
            variant="outlined"
            label="Correo Institucional Alumno"
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
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              ),
            }}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
