import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { UseTranslation, useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state;

  const errorMessages = {
    0: [t("404.e11"), t("404.e12")],
    1: [t("404.e21"), t("404.e22")]
  };

  const errorMessage = state !== undefined && errorMessages[state] ? errorMessages[state] : errorMessages[0];

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <br /><br /><br /><br /><br />
        <h1 style={styles.title}>{errorMessage[0]}</h1>
        <p style={styles.message}>{errorMessage[1]}</p>
        <Link to="/" style={styles.button}>{t("404.home")}</Link>
      </div>
    </>
  );
};

export default NotFound;


const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#003580',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
  },
};