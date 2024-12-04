//src/app/formularioRegistro/BasicSelectCarrera.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BasicSelectPropsCarrera {
  onChange: (selectedCarrera: string) => void;
}

export default function BasicSelect({ onChange }: BasicSelectPropsCarrera) {
  const [carrera, setCarrera] = React.useState('');
  const [carreras, setcarreras] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCarrera = event.target.value;
    setCarrera(selectedCarrera);
    onChange(selectedCarrera); // Notificar al componente padre sobre la selección
  };

  React.useEffect(() => {
    // Fetch talleres desde la API
    fetch('http://localhost:86/api/carrera')
      .then(response => response.json())
      .then(data => setcarreras(data.map((carrera: { nombre_carrera: string }) => carrera.nombre_carrera)))
      .catch(error => console.error('Error al obtener talleres:', error));
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selecciona una Carrera</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={carrera}
          label="Selecciona un Taller"
          onChange={handleChange}
        >
          {carreras.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
