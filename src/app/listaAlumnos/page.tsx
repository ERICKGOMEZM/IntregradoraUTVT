// page.tsx
import React from 'react';
import ListaAlumnos from './listaAlumnos'; // Asegúrate de ajustar la ruta si es necesario
import './listaAlumnos.module.css'; // Asegúrate de importar el archivo CSS

const Page = () => {
  return (
    <div className="centered-container">
      <h1 className="centered-text">Tabla de alumnos Inscritos</h1>
      <ListaAlumnos /> {/* Aquí se renderiza la tabla */}
    </div>
  );
};

export default Page;


