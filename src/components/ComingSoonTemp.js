import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  IconButton,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { styled } from '@mui/system';

// Minimalistic Animations
const fadeIn = styled('div')({
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  animation: 'fadeIn 1.5s ease-in-out',
});

function ComingSoon() {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSignUp = async e => {
    e.preventDefault();
    if (!email) {
      setSnackbarMsg('Please enter a valid email.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMsg('Thank you for signing up!');
        setSnackbarSeverity('success');
        setEmail('');
        window.location.href = 'https://design-dreamer-helper.vercel.app';
      } else {
        setSnackbarMsg(data.message || 'Something went wrong.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMsg('Failed to sign up. Please try again later.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FAF9F6',
        color: '#333',
        padding: { xs: '4rem 1rem', md: '6rem 8rem' },
        textAlign: 'center',
      }}
      onClick={() =>
        (window.location.href = 'https://design-dreamer-helper.vercel.app')
      }
    >
      {/* Title */}
      <fadeIn>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#C99C33',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          SupremeAI – Elevate Your Jewelry Designs
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: '#6b4f4f',
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          AI-powered jewelry designing at your fingertips. Join our waitlist
          today!
        </Typography>
      </fadeIn>

      {/* Visuals Section */}
      <Grid
        container
        spacing={4}
        sx={{ marginTop: '2rem', marginBottom: '2rem', alignItems: 'center' }}
      >
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: '1rem', borderRadius: '12px' }}>
            <img
              src="https://github.com/Akashkumar2010/supreme_files/blob/main/Supreme-Ai%20preview.png?raw=true"
              alt="Jewelry AI Preview"
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0px 2px 10px rgba(201, 156, 51, 0.3)',
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: '1rem', borderRadius: '12px' }}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/4EdF8LNl4lo?si=F4l6phWLUGsfY5cl"
              title="Jewelry AI Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: '12px' }}
            ></iframe>
          </Paper>
        </Grid>
      </Grid>

      {/* Waitlist Form */}
      <Box
        component="form"
        onSubmit={handleSignUp}
        sx={{
          maxWidth: '450px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          label="Enter your email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#C99C33', // Match with navbar color
              },
              '&:hover fieldset': {
                borderColor: '#B3882F', // Darker shade on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#C99C33', // Focus color
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: '#C99C33',
            color: '#fff',
            borderRadius: '8px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#B3882F',
            },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Join Waitlist
        </Button>
      </Box>

      {/* Social Media Icons */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <IconButton href="https://facebook.com" sx={{ color: '#3b5998' }}>
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" sx={{ color: '#1DA1F2' }}>
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" sx={{ color: '#C13584' }}>
          <Instagram />
        </IconButton>
        <IconButton href="https://linkedin.com" sx={{ color: '#0e76a8' }}>
          <LinkedIn />
        </IconButton>
      </Stack>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ComingSoon;
