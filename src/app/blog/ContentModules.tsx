// src/app/contentModules/ContentModules.tsx
"use client";

import React from 'react';
import styles from './contentModules.module.css';
import BasicDateCalendar from '../blog/BasicDateCalendar'; // Asegúrate de que la ruta sea correcta
import SimplePaper from './SimplePaper'; // Importa el componente Paper

const ContentModules = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.calendarContainer}>
        <BasicDateCalendar />
      </div>
      <div className={styles.paperContainer}>
        <SimplePaper />
      </div>
    </div>
  );
};

export default ContentModules;
