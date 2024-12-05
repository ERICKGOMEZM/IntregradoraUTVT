// src/app/BasicSelectPadecimiento.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BasicSelectPropsPadecimiento {
    onChange: (selectedPadecimiento: string) => void;
}

export default function BasicSelectPadecimiento({ onChange }: BasicSelectPropsPadecimiento) {
    const [padecimiento, setPadecimiento] = React.useState('');
    const [padecimientos, setPadecimientos] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedPadecimiento = event.target.value;
        setPadecimiento(selectedPadecimiento);
        onChange(selectedPadecimiento); // Notificar al componente padre sobre la selección
    };

    React.useEffect(() => {
        // Fetch padecimientos desde la API
        fetch('http://localhost:8080/api/padecimientos')
        .then(response => response.json())
        .then(data => setPadecimientos(data.map((padecimiento: { tipo_padecimiento: string }) => padecimiento.tipo_padecimiento)))
        .catch(error => console.error('Error al obtener padecimientos:', error));
    }, []);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="padecimiento-select-label">Selecciona un Padecimiento</InputLabel>
                <Select
                    labelId="padecimiento-select-label"
                    id="padecimiento-select"
                    value={padecimiento}
                    label="Selecciona un Padecimiento"
                    onChange={handleChange}
                >
                    {padecimientos.map((tipoPadecimiento) => (
                        <MenuItem key={tipoPadecimiento} value={tipoPadecimiento}>
                            {tipoPadecimiento}
                        </MenuItem>
                    ))}
                </Select>
        </FormControl>
        </Box>
    );
}
