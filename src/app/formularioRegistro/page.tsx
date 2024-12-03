import React from 'react';
import Formularioregistro from './formularioregistro';
import styles from './page.module.css'; // Crea un archivo CSS si aún no tienes uno

const Page = () => {
  return (
    <div className={styles.pageContainer}>
      <Formularioregistro />
    </div>
  );
};

export default Page;

