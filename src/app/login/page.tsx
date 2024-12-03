import React from 'react';
import LoginForm from '../login/LoginForm';
import styles from './LoginForm.module.css'; // Asegúrate de crear este archivo para los estilos

const HomePage = () => {
  return (
    <main className={styles.mainContainer}>
      <LoginForm /> {/* Renderiza el formulario de inicio de sesión */}
    </main>
  );
};

export default HomePage;