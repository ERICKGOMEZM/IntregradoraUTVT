// src/app/blog/SimplePaper.tsx

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 0,
          width: 100,
          height: 100,
        },
      }}
    >
      <Paper elevation={3} />
    </Box>
  );
}
