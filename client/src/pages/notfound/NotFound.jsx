import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const NotFound = () => {
  const location = useLocation();
  const state = location.state;

  const errorMessages = {
    0: ["404 - Page Not Found", "Oops! This page doesn't exist."],
    1: ["Uh oh! You're not logged in.", "Sign in or create an account to access your profile."]
  };

  const errorMessage = state !== undefined && errorMessages[state] ? errorMessages[state] : errorMessages[0];

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <br /><br /><br /><br /><br />
        <h1 style={styles.title}>{errorMessage[0]}</h1>
        <p style={styles.message}>{errorMessage[1]}</p>
        <Link to="/" style={styles.button}>Go to Home</Link>
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