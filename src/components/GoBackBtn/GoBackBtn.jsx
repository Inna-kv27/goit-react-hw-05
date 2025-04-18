import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './GoBackBtn.module.css';

const GoBackBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = useRef(
    location.state?.from || '/movies'
  );

  const handleGoBack = () => {
    navigate(backLink.current);
  };

  return (
    <button
      type="button"
      className={styles.goBackBtn}
      onClick={handleGoBack}
    >
      Go back
    </button>
  );
};

export default GoBackBtn;
