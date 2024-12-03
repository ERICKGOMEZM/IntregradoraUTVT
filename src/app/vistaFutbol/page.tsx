// src/app/page.tsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './sidebard';

const Page = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ padding: '20px' }}>
        <h1>Bienvenido a la Vista Futbol</h1>
        <p>Contenido principal de la página...</p>
      </div>
    </div>
  );
};

export default Page;
