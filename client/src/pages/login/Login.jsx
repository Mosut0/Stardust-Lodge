import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, TextField, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const location = useLocation();
  const data = location.state;

  const [isError, setError] = useState(false);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [registrationFields, setRegistrationFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(location.state === null ? false : location.state);

  const [fieldError, setFieldError] = useState({
    username: false,
    password: false,
    firstName: false, 
    lastName: false, 
    email: false, 
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
    setRegistrationFields((prev) => ({ ...prev, [id]: value }));
    setFieldError((prev) => ({ ...prev, [id]: false }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const hasEmptyFields = Object.keys(credentials).some((key) => !credentials[key]);
  
    if (hasEmptyFields) {
      const updatedFieldError = {};
      for (const key in credentials) {
        updatedFieldError[key] = !credentials[key];
      }
      setFieldError(updatedFieldError);
      return; 
    }
  
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      console.log(data)
      if (data != null && data != true) {
        navigate(data);
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    setError(true)
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const allFields = { ...registrationFields, ...credentials };

    const hasEmptyFields = Object.values(allFields).some((val) => !val);
  
    if (hasEmptyFields) {
      const updatedFieldError = {};
      for (const key in allFields) {
        updatedFieldError[key] = !allFields[key];
      }
      setFieldError(updatedFieldError);
      return; 
    }

    try {
      const newUser = {
        username: credentials.username,
        email: registrationFields.email,
        fname: registrationFields.firstName,
        lname: registrationFields.lastName,
        password: credentials.password
      }
      const res = await axios.post("http://localhost:5000/api/users", newUser);
      console.log("New user created:", res.data);
      setRegistrationSuccess(true);
    } catch (err) {
      console.error("Failed to create a new user:", err);
      
    }
  };

  const toggleForm = () => {
    setError(false)
    setRegistrationSuccess(false);
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(5px)', 
          zIndex: -1, 
        }}
      />
      <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {isLogin ? <h2>Login</h2> : <h2>Register</h2>}
            </Grid>
            {!isLogin && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    id="firstName"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', fontSize: '16px' }} />
                      ),
                    }}
                    error={fieldError.firstName}
                    helperText={fieldError.firstName && "First name is required"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    id="lastName"
                  onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', fontSize: '16px' }} />
                      ),
                    }}
                    error={fieldError.lastName}
                    helperText={fieldError.lastName && "Last name is required"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    id="email"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', fontSize: '16px' }} />
                      ),
                    }}
                    error={fieldError.email}
                    helperText={fieldError.email && "Email is required"}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                id="username"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', fontSize: '16px' }} />
                  ),
                }}
                error={fieldError.username}
                helperText={fieldError.username && "Username is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                id="password"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px', fontSize: '16px' }} />
                  ),
                }}
                error={fieldError.password}
                helperText={fieldError.password && "Password is required"}
              />
            </Grid>
            <Grid item xs={12}>
              {isLogin ? (
                <Button fullWidth variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              ) : (
                <Button fullWidth variant="contained" onClick={handleRegister}>
                  Sign Up
                </Button>
              )}
              {registrationSuccess && <span style={{ color: "green" }}>Registration successful! Login now.</span>}
              {(isError && error) && <span style={{ color: "red" }}>{error.message}</span>}
            </Grid>
            <Grid item xs={12}>
              {isLogin ? (
                <Button fullWidth onClick={toggleForm}>
                  Register
                </Button>
              ) : (
                <Button fullWidth onClick={toggleForm}>
                  Login
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Login;