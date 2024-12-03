// src/app/sidebar/page.tsx
import React from 'react';
import Sidebar from './sidebarInstructor';
import Navbar from './navbarInstructor';
import BasicTable from '../listaAlumnos/listaAlumnos'; // Importamos el componente de la lista de alumnos

const SidebarPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar con un ancho fijo */}
        <Sidebar isOpen={undefined} toggleSidebar={undefined} />
        
        {/* Contenedor centrado */}
        <div
          style={{
            marginLeft: '250px',  // Desplaza el contenido para evitar la barra lateral
            display: 'flex',
            justifyContent: 'center',  // Centrado horizontal
            alignItems: 'center',      // Centrado vertical
            flex: 1,                   // Asegura que el div ocupe todo el espacio disponible
            padding: '20px',
          }}
        >
          <BasicTable />  {/* Aquí renderizamos la tabla de alumnos */}
        </div>
      </div>
    </>
  );
};

export default SidebarPage;
