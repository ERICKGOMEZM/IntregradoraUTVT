'use client';
import React from 'react';
import VistaInicio from './vistaInicio/vistasInicio.jsx'; // Asegúrate de que la ruta sea correcta
import styles from './vistaInicio/vistaselnicio.module.css';

const Page = () => {
    return (
        <main className={styles.mainContainer}>
            <VistaInicio /> {/* Renderiza el componente */}
        </main>
    );
};

export default Page;

