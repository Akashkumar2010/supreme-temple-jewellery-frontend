// src/components/ComingSoon.js

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMsg('Thank you for signing up!');
        setSnackbarSeverity('success');
        setEmail('');
      } else {
        setSnackbarMsg(data.message || 'Something went wrong.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error:', error);
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
        backgroundColor: '#f0f4f8',
        padding: { xs: '4rem 1rem', md: '6rem 8rem' },
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1d2671' }}
      >
        Coming Soon: SupremeAI
      </Typography>
      {/* Subtitle */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#555', maxWidth: '700px', margin: '0 auto' }}
      >
        Empowering Bharathanatyam Dancers and Dance Schools to Design Their
        Unique Creations with Ease
      </Typography>

      {/* Visuals Section */}
      <Grid
        container
        spacing={4}
        sx={{ marginTop: '2rem', marginBottom: '2rem' }}
      >
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '15px' }}>
            <img
              src="/assets/coming-soon-image.jpg" // Update the path as per your asset
              alt="SupremeAI Preview"
              style={{ width: '100%', borderRadius: '15px' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '15px' }}>
            <video
              width="100%"
              controls
              style={{ borderRadius: '15px' }}
              poster="/assets/sai.webp" // Optional poster image
            >
              <source src="/assets/coming-soon-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Paper>
        </Grid>
      </Grid>

      {/* Waitlist Form */}
      <Box
        component="form"
        onSubmit={handleSignUp}
        sx={{
          maxWidth: '500px',
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
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: '#1d2671',
            color: '#fff',
            borderRadius: '8px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#122b76',
            },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Call-to-Action Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            borderColor: '#1d2671',
            color: '#1d2671',
            borderRadius: '20px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#1d2671',
              color: '#fff',
            },
          }}
          onClick={() => {
            // Implement "Learn More" navigation or modal
            alert('Learn More functionality to be implemented.');
          }}
        >
          Learn More
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            borderColor: '#1d2671',
            color: '#1d2671',
            borderRadius: '20px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#1d2671',
              color: '#fff',
            },
          }}
          onClick={() => {
            // Implement social media sharing functionality
            alert('Share on Social Media functionality to be implemented.');
          }}
        >
          Share on Social Media
        </Button>
      </Stack>

      {/* Social Media Icons */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
          Follow us on:
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#3b5998' }}
            aria-label="Facebook"
          >
            <Facebook />
          </IconButton>
          <IconButton
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#1DA1F2' }}
            aria-label="Twitter"
          >
            <Twitter />
          </IconButton>
          <IconButton
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#C13584' }}
            aria-label="Instagram"
          >
            <Instagram />
          </IconButton>
          <IconButton
            component="a"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#0e76a8' }}
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </IconButton>
        </Stack>
      </Box>

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
