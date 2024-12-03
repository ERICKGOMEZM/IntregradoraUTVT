import React from 'react';
import LoginInstructoresForm from '../loginInstructores/loginInstructores.jsx';
import styles from './loginInstructore.module.css';

const LoginInstructoresPage = () => {

    return(
        <main className={styles.mainContainer}>
            <LoginInstructoresForm />
        </main>
    );
};

export default LoginInstructoresPage;