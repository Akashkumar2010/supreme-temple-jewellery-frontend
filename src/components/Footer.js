import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  // Navigation handlers for dynamic routing
  const handleNavigation = path => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        bgcolor: '#f7f7f7',
        color: '#333',
        py: 6,
        width: '100%',
        position: 'relative',
        mt: 'auto',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              ABOUT US
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Home
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/products')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Shop
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/accessories')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Accessories
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/about')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                About Us
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/contact')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Contact Us
              </Link>
            </Typography>
          </Grid>

          {/* Categories Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              CATEGORIES
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/contact')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Contact Us
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/about')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                About Us
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/privacy-policy')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Privacy Policy
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/terms-and-conditions')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Terms & Conditions
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/refund-policy')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Refund & Return Policy
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/measurement-form')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Download Measurement Form
              </Link>
            </Typography>
          </Grid>

          {/* Customer Care Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              BULK ORDERS
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() => handleNavigation('/temple-jewellery')}
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Temple Jewellery
              </Link>
            </Typography>
          </Grid>

          {/* Subscribe Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Don&apos;t miss out on a sale again.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter and all the latest details.
            </Typography>
            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <TextField
                label="Your email address"
                variant="outlined"
                size="small"
              />
              <Button variant="contained" color="primary">
                SUBSCRIBE
              </Button>
              <Typography variant="body2">
                <label>
                  <input type="checkbox" style={{ marginRight: '5px' }} />I
                  agree with the terms and conditions
                </label>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            borderTop: '1px solid #ddd',
            mt: 3,
            pt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Supreme Temple Jewellery. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
