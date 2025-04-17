import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! The page you were looking for could not be
        found.
      </p>
      <Link to="/" className={styles.link}>
        Go to Home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
