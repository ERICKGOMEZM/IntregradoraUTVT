// BasicSelect.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BasicSelectProps {
  onChange: (selectedTaller: string) => void;
}

export default function BasicSelect({ onChange }: BasicSelectProps) {
  const [taller, setTaller] = React.useState('');
  const [talleres, setTalleres] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTaller = event.target.value;
    setTaller(selectedTaller);
    onChange(selectedTaller); // Notificar al componente padre sobre la selección
  };

  React.useEffect(() => {
    // Fetch talleres desde la API
    fetch('http://localhost:8080/api/talleres')
      .then(response => response.json())
      .then(data => setTalleres(data.map((taller: { nombre_taller: string }) => taller.nombre_taller)))
      .catch(error => console.error('Error al obtener talleres:', error));
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selecciona un Taller</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={taller}
          label="Selecciona un Taller"
          onChange={handleChange}
        >
          {talleres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
