import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Save the token in localStorage for authenticated access
        localStorage.setItem('token', data.token);

        // Display success message and redirect
        setSuccess('Login successful! Redirecting...');
        setError('');
        setTimeout(() => navigate('/'), 2000); // Redirect to the homepage
      } else {
        // Display error message from server or generic error
        setError(data.message || 'Login failed. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Login failed due to server error. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#FAF9F6',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: '#C99C33' }}
        >
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" align="center" sx={{ marginBottom: 2 }}>
            {success}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#C99C33',
                },
                '&:hover fieldset': {
                  borderColor: '#B3882F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C99C33',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#C99C33',
                },
                '&:hover fieldset': {
                  borderColor: '#B3882F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C99C33',
                },
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: '#C99C33',
              '&:hover': { backgroundColor: '#B3882F' },
            }}
          >
            Login
          </Button>
          <Typography variant="body2" align="center">
            New here?{' '}
            <Button
              onClick={() => navigate('/signup')}
              color="primary"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
