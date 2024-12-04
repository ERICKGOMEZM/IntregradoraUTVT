'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


// Definir la interfaz para los datos de los alumnos
interface Alumno {
  id_alumno: number; // <-- Agregado
  alumno_name: string;
  alumno_apellido_paterno: string;
  alumno_apellido_materno: string;
  carrera_name: string;
  cuatrimestre_name: string;
  taller_name: string;
  padecimiento_name: string | null;
  padecimiento_descripcion: string | null;
  asistencia: string; // 'asistio', 'noAsistio', 'justificado', o vacío
  justificacion_descripcion: string | null;
}


interface Props {
  idTaller: number;
}

export default function BasicTable({ idTaller }: Props) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [openModal, setOpenModal] = useState(false); // Modal de asistencia
  const [openJustificacionModal, setOpenJustificacionModal] = useState(false); // Modal de justificación
  const [selectedAlumno, setSelectedAlumno] = useState<number | null>(null);
  const [justificacion, setJustificacion] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>(''); // Opción seleccionada en el modal de asistencia

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const idTaller = 1; // Aquí, ¿por qué estás asignando 1 directamente? Esto se puede reemplazar por la prop `idTaller` para que se utilice correctamente.
        const response = await fetch(`http://localhost:86/api/datos-register-taller/${idTaller}`);
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        console.log('Datos recibidos de la API:', data); // Revisa que id_alumno esté en cada alumno
        setAlumnos(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    obtenerDatos();
  }, [idTaller]);

  // Función para manejar la apertura del modal de asistencia
  const handleOpenModal = (index: number) => {
    if (alumnos[index].asistencia) {
      Swal.fire({
        title: 'Asistencia registrada',
        text: 'La asistencia ya ha sido registrada para este alumno.',
        icon: 'info',
        confirmButtonText: 'Entendido',
      });
      return;
    }
    setSelectedAlumno(index);
    setOpenModal(true);
  };
  
  
  // Mantén el resto de las funciones como están


  // Función para guardar la asistencia
  const handleSaveAsistencia = async () => {
    if (selectedAlumno !== null && selectedOption) {
      try {
        handleCloseModal(); // Cierra el modal antes de la acción
  
        const alumno = alumnos[selectedAlumno];
        console.log('Alumno seleccionado:', alumno); // Verifica que alumno tiene id_alumno
  
        const fecha = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
  
        const body = {
          id_alumno: alumno.id_alumno,  // Verifica que alumno.id_alumno no sea undefined
          id_taller: idTaller,  // Usa el valor correcto de idTaller
          fecha,
          asistencia: selectedOption,
          justificacion: selectedOption === 'justificado' ? justificacion : null,
        };
  
        // Depuración de datos enviados
        console.log('Datos enviados:', body);
  
        const response = await fetch('http://localhost:86/api/asistencia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) throw new Error('Error al registrar la asistencia');
  
        const data = await response.json();
        console.log('Respuesta del backend:', data);
        Swal.fire('Éxito', data.message, 'success');
  
        // Actualiza la asistencia en el estado de los alumnos
        setAlumnos((prevAlumnos) => {
          const updatedAlumnos = [...prevAlumnos];
          updatedAlumnos[selectedAlumno].asistencia = selectedOption;
          return updatedAlumnos;
        });
      } catch (error) {
        console.error('Error al guardar asistencia:', error);
        Swal.fire('Error', 'No se pudo registrar la asistencia.', 'error');
      }
    } else {
      Swal.fire('Advertencia', 'Selecciona una opción de asistencia.', 'warning');
    }
  };
  
  

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOption('');
  };



  // Funciones para manejar justificación
  const handleOpenJustificacionModal = (index: number) => {
    setSelectedAlumno(index);
    setOpenJustificacionModal(true);
  };

  const handleCloseJustificacionModal = () => {
    setOpenJustificacionModal(false);
    setJustificacion('');
  };

  const handleSaveJustificacion = async () => {
    if (justificacion.trim() !== '' && selectedOption === 'justificado') {
        await handleSaveAsistencia();
        handleCloseJustificacionModal();
    } else {
        Swal.fire('Advertencia', 'Agrega una descripción para justificar.', 'warning');
    }
};


  // Función para mostrar el ícono de asistencia
  const getAsistenciaIcon = (asistencia: string) => {
    switch (asistencia) {
      case 'asistio':
        return <CheckIcon color="success" sx={{ fontSize: 30 }} />;
      case 'noAsistio':
        return <CancelIcon color="error" sx={{ fontSize: 30 }} />;
      case 'justificado':
        return <AccessTimeIcon color="warning" sx={{ fontSize: 30 }} />;
      default:
        return <AddCircleIcon color="primary" sx={{ fontSize: 30, cursor: 'pointer' }} />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
        padding: 2,
        overflowX: 'auto',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="tabla de alumnos inscritos">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Ap. Paterno</TableCell>
              <TableCell align="center">Ap. Materno</TableCell>
              <TableCell align="center">Carrera</TableCell>
              <TableCell align="center">Cuatrimestre</TableCell>
              <TableCell align="center">Taller</TableCell>
              <TableCell align="center">Padecimiento</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Asistencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno, index) => (
              <TableRow key={index}>
                <TableCell align="center">{alumno.alumno_name}</TableCell>
                <TableCell align="center">{alumno.alumno_apellido_paterno}</TableCell>
                <TableCell align="center">{alumno.alumno_apellido_materno}</TableCell>
                <TableCell align="center">{alumno.carrera_name}</TableCell>
                <TableCell align="center">{alumno.cuatrimestre_name}</TableCell>
                <TableCell align="center">{alumno.taller_name}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    border: alumno.padecimiento_name ? '2px solid red' : 'none',
                    color: alumno.padecimiento_name ? 'red' : 'inherit',
                    fontWeight: alumno.padecimiento_name ? 'bold' : 'normal',
                  }}
                >
                  {alumno.padecimiento_name || 'N/A'}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    border: alumno.padecimiento_descripcion ? '2px solid red' : 'none',
                    color: alumno.padecimiento_descripcion ? 'red' : 'inherit',
                    fontWeight: alumno.padecimiento_descripcion ? 'bold' : 'normal',
                  }}
                >
                  {alumno.padecimiento_descripcion || 'N/A'}
                </TableCell>
                <TableCell align="center" onClick={() => handleOpenModal(index)}>
                  {getAsistenciaIcon(alumno.asistencia)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para seleccionar asistencia */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Seleccionar Asistencia</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <FormControlLabel value="asistio" control={<Radio />} label="Asistió" />
            <FormControlLabel value="noAsistio" control={<Radio />} label="No Asistió" />
            <FormControlLabel value="justificado" control={<Radio />} label="Justificado" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveAsistencia} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para agregar justificación */}
      <Dialog open={openJustificacionModal} onClose={handleCloseJustificacionModal}>
        <DialogTitle>Agregar Justificación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="justificacion"
            label="Descripción de la justificación"
            type="text"
            fullWidth
            variant="outlined"
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJustificacionModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveJustificacion} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
