import React, { useState } from 'react';
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

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      if(data){
        navigate(data)
      }else{
        navigate("/")
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  const [isLogin, setIsLogin] = useState(location.state === null ? false : location.state);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // Handle register logic here
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
          filter: 'blur(5px)', // Apply the blur effect
          zIndex: -1, // To place the background behind other content
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
              />
            </Grid>
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', fontSize: '16px' }} />
                    ),
                  }}
                />
              </Grid>
            )}
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
              />
            </Grid>
            <Grid item xs={12}>
              {isLogin ? (
                <Button fullWidth variant="contained" onClick={handleClick}>
                  Login
                </Button>
              ) : (
                <Button fullWidth variant="contained" onClick={handleClick}>
                  Sign Up
                </Button>
              )}
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

//   return (
//     <div className="login">
//       <div className="lContainer">
//         <input
//           type="text"
//           placeholder="username"
//           id="username"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <button onClick={handleClick} className="lButton">
//           Login
//         </button>
//         {error && <span>{error.message}</span>}
//       </div>
//     </div>
//   );
// };

// export default Login;