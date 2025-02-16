// frontend/src/pages/ContactUs.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

function ContactUs() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State to manage form errors
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let temp = {};
    temp.name = formData.name ? '' : 'This field is required.';
    temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)
      ? ''
      : 'Email is not valid.';
    temp.subject = formData.subject ? '' : 'This field is required.';
    temp.message = formData.message ? '' : 'This field is required.';
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === '');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('YOUR_WEB_APP_URL', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.status === 'success') {
          setSnackbarMsg(result.message);
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          setSnackbarMsg(result.message || 'Failed to send message.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      } catch (error) {
        setSnackbarMsg('Something went wrong. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSnackbarMsg('Please fill out all required fields correctly.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleMouseEnterButton = () => setShowButton(false);

  return (
    <div
      style={{
        backgroundImage: 'url("moroccan-flower.png")', // Replace with the actual path to the background image
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container sx={{ pt: 8, pb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Our Office</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              Kommandiamman Coil Street Vadasery,
              <br />
              Nagercoil, Tamilnadu, 629001
              <br />
              Country
            </Typography>

            <Box display="flex" alignItems="center" mb={2} mt={2}>
              <Phone color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Phone</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              +91 9443707685
            </Typography>

            <Box display="flex" alignItems="center" mb={2} mt={2}>
              <Email color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Email</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              supremetemplejewelry@gmail.com
            </Typography>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={Boolean(errors.subject)}
                    helperText={errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                  />
                </Grid>
              </Grid>
              {showButton && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  disabled={isSubmitting}
                  onMouseEnter={handleMouseEnterButton}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default ContactUs;
