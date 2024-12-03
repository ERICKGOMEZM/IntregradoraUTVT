import React from 'react';
import Sidebar from './sidebar';
import Navbar from '../navbar/navbar';
import CustomImageList from '../contenidoPrimcipal/contenidoImagenes'; 

const SidebarPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', marginTop: '64px' }}>
        {/* Sidebar con un ancho fijo */}
        <Sidebar isOpen={undefined} toggleSidebar={undefined} />
        {/* Contenedor principal */}
        <div style={{ flex: 1, padding: '16px' }}>
          <CustomImageList />
        </div>
      </div>
    </>
  );
};


export default SidebarPage;
