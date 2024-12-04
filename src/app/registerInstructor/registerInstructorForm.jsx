//src/app/registerInstructor/registerInstructorForm.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import styles from '../registerInstructor/registerIntructorForm.module.css';

const RegisterInstructorForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(''); // Estado para el select inicial
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    edad: '',
    matricula: '',
    correo: '',
    contraseña: '',
    id_taller: '',
  });

  const [talleres, setTalleres] = useState([]);

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const response = await fetch('http://localhost:86/api/talleres');
        const data = await response.json();
        setTalleres(data);
      } catch (error) {
        console.error('Error al cargar talleres:', error);
      }
    };
    fetchTalleres();
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole === 'Administrador') {
      router.push('/registroAdmin');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:86/api/maestros/register-maestro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Instructor registrado exitosamente',
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h5 className={styles.title}></h5>
      {/* Select inicial */}
      <div className={styles.inputContainer}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="select-role-label">Selecciona tu Rol</InputLabel>
          <Select
            labelId="select-role-label"
            id="select-role"
            value={role}
            onChange={handleRoleChange}
            label="Selecciona tu Rol"
          >
            <MenuItem value="Maestro">Maestro</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* Mostrar formulario solo si el rol es Maestro */}
      {role === 'Maestro' && (
        <form className={styles.form} onSubmit={handleSubmit}>
          {[ // Campos del formulario
            { id: 'nombre', label: 'Nombre(s)', placeholder: 'Ingresa tu nombre' },
            { id: 'apellido_paterno', label: 'Apellido Paterno', placeholder: 'Ingresa tu Apellido Paterno' },
            { id: 'apellido_materno', label: 'Apellido Materno', placeholder: 'Ingresa tu Apellido Materno' },
            { id: 'edad', label: 'Edad', placeholder: 'Ingresa tu edad', type: 'number' },
            { id: 'matricula', label: 'Matrícula', placeholder: 'Ingresa tu matrícula' },
            { id: 'correo', label: 'Correo', placeholder: 'correo@universidad.com', type: 'email' },
          ].map(({ id, label, placeholder, type = 'text' }) => (
            <div className={styles.inputContainer} key={id}>
              <TextField
                id={id}
                name={id}
                variant="outlined"
                label={label}
                placeholder={placeholder}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </div>
          ))}
          <div className={styles.inputContainer}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="select-taller-label">Selecciona tu Taller</InputLabel>
              <Select
                labelId="select-taller-label"
                id="select-taller"
                name="id_taller"
                value={formData.id_taller}
                onChange={handleChange}
                label="Seleccione un taller"
              >
                {talleres.map((taller) => (
                  <MenuItem key={taller.id_taller} value={taller.id_taller}>
                    {taller.nombre_taller}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
      )}
    </div>
  );
};

export default RegisterInstructorForm;
