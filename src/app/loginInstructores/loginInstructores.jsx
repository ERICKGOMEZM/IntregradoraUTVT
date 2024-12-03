'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
//import Swal from 'sweetalert2';
import styles from '../loginInstructores/loginInstructore.module.css';

const LoginInstructorForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Estado para el rol seleccionado
  const [error, setError] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
        setError('Por favor selecciona un rol.');
        return;
    }

    try {
        const endpoint = role === 'maestro'
            ? 'http://localhost:8080/api/maestros/login'
            : 'http://localhost:8080/api/admin/login-admin'; // Ruta basada en el rol seleccionado

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo,
                contraseña: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar token en localStorage
            localStorage.setItem('token', data.token);

            // Decodificar el token para obtener el rol (id_maestro, id_admin, etc.)
            const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decodificamos el token

            // Verificar el rol del usuario
            if (decodedToken.id_maestro) {
                // Si es maestro, redirigir a la vista correspondiente
                switch (decodedToken.id_maestro) {
                    case 1:
                      router.push('/vistaInstructor');
                        break;
                    case 2:
                        router.push('/vistaBasquetbol');
                        break;
                    default:
                        router.push('/vistaGeneralMaestro');
                        break;
                }
            } else if (decodedToken.id_admin) {
                // Si es un administrador, redirigir a la vista del administrador
                router.push('/vistaAdmin');
            } else {
                setError('Rol no reconocido');
            }
        } else {
            setError(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        setError('Error al procesar la solicitud. Intenta más tarde.');
    }
};

  return (
    <div className={styles.loginContainer} style={{ position: 'relative' }}>
      {/* Botón para regresar */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push('/')}
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

      <h5 className={styles.title}>Iniciar Sesión</h5>
      <p className={styles.subtitle}>
        ¿No tienes cuenta?{' '}
        <a href="/registerInstructor" className={styles.link}>
          Regístrate aquí
        </a>
      </p>

      {/* Mostrar error si existe */}
      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="role-label">Selecciona tu rol</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            label="Selecciona tu rol"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="maestro">Maestro</MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.inputContainer}>
          <TextField
            id="correo"
            name="correo"
            variant="outlined"
            label="Correo Institucional"
            placeholder="correo@universidad.com"
            type="email"
            fullWidth
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            id="password"
            name="password"
            variant="outlined"
            label="Contraseña"
            placeholder="************"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default LoginInstructorForm;
