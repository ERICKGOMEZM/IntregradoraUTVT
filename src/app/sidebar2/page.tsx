'use client';

import React from 'react';
import Sidebar2 from './sidebar2'; // Ajusta la ruta según la ubicación de `sidebar2.jsx`

const Page = () => {
  return (
    <div>
      {/* Renderiza el Sidebar2 */}
      <Sidebar2 />
      
      {/* Puedes agregar más contenido aquí */}
      <div style={{ marginLeft: '240px', marginTop: '64px', padding: '20px' }}>
        <h1>Página principal</h1>
        <p>Este es el contenido de la página principal.</p>
      </div>
    </div>
  );
};

export default Page;
