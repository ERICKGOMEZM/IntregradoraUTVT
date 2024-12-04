// BasicSelect.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BasicSelectPropsCuatrimestre {
  onChange: (selectedCuatrimestre: string) => void;
}

export default function BasicSelect({ onChange }: BasicSelectPropsCuatrimestre) {
  const [cuatrimestre, setCuatrimestre] = React.useState('');
  const [cuatrimestres, setCuatrimestres] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCuatrimestre = event.target.value;
    setCuatrimestre(selectedCuatrimestre);
    onChange(selectedCuatrimestre); // Notificar al componente padre sobre la selección
  };

  React.useEffect(() => {
    // Fetch talleres desde la API
    fetch('http://localhost:86/api/cuatrimestre')
      .then(response => response.json())
      .then(data => setCuatrimestres(data.map((cuatrimestre: { nombre_cuatrimestre: string }) => cuatrimestre.nombre_cuatrimestre)))
      .catch(error => console.error('Error al obtener talleres:', error));
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selecciona un cuatrimestre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cuatrimestre}
          label="Selecciona un Cuatrimestre"
          onChange={handleChange}
        >
          {cuatrimestres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
