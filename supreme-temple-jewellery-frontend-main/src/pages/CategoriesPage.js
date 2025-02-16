import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductsByCategory } from '../services/api';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Snackbar,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #FFFFFF, #FFFAFA)',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.3)',
  },
}));

const categoryMap = {
  headfullset: 'Head Full Set',
  bangles: 'Bangles',
  'necklace-malai': 'Necklace & Malai',
  otiyanam: 'Otiyanam',
  'other-accessories': 'Other Accessories',
  hairclips: 'Hairclips',
  jhumkas: 'Jhumkas',
  matal: 'Matal',
  earings: 'Earrings',
};

function CategoriesPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'info', 'error', 'warning'
  });

  const displayCategory = categoryMap[category] || category;

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProductsByCategory(displayCategory);
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [displayCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleShare = product => {
    const shareUrl = `${window.location.origin}/product/${product._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this amazing product: ${product.name}!`,
          url: shareUrl,
        })
        .then(() => console.log('Product shared successfully!'))
        .catch(err => console.error('Error sharing product:', err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      setSnackbar({
        open: true,
        message: 'Product link copied to clipboard!',
        severity: 'info',
      });
    }
  };

  const handleAddToWishlist = product => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(product._id)) {
      wishlist.push(product._id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setSnackbar({
        open: true,
        message: 'Product added to wishlist!',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Product already in wishlist.',
        severity: 'info',
      });
    }
  };

  const handleAddToCart = product => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(product._id)) {
      cart.push(product._id);
      localStorage.setItem('cart', JSON.stringify(cart));
      setSnackbar({
        open: true,
        message: 'Product added to cart!',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Product already in cart.',
        severity: 'info',
      });
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/moroccan-flower.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensure the background covers the full viewport
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1, mt: -2 }}>
        {/* Breadcrumb Navigation */}
        <Box
          sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'flex-start' }}
        >
          <Grid container spacing={1.5}>
            {/* Breadcrumbs Section */}
            <Grid item xs={10} sm={1.5}>
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  '& .MuiLink-root': {
                    padding: '4px 8px', // Add padding for better clickability
                    borderRadius: '4px', // Add subtle border-radius for a button-like feel
                    textDecoration: 'none', // Remove underline by default
                    '&:hover': {
                      backgroundColor: 'Transparent', // Light background on hover
                      textDecoration: 'none', // Keep underline removed
                    },
                  },
                }}
              >
                <MuiLink
                  component={Link}
                  to="/"
                  underline="none" // Remove underline for better styling
                  color="inherit"
                >
                  Home
                </MuiLink>
                <MuiLink
                  component={Link}
                  to={`/categories/${category}`}
                  underline="none" // Remove underline for better styling
                  color="inherit"
                >
                  {displayCategory}
                </MuiLink>
              </Breadcrumbs>
            </Grid>

            {/* Page Title Section */}
            <Grid item xs={12}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center', // Keep the title centered
                  fontWeight: 'bold',
                  background:
                    'linear-gradient(90deg, #FF7F50, #FF6347, #FF4500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mt: 4, // Add spacing between Breadcrumbs and the title
                }}
              >
                {displayCategory}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {products.length === 0 ? (
          <Typography variant="h6" align="center">
            No products found for this category.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <StyledCard>
                  <Link to={`/product/${product._id}`}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={
                        product.images[0] || 'https://via.placeholder.com/300'
                      }
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Link>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      ₹{product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: 'italic' }}
                    >
                      {displayCategory}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => handleShare(product)}
                      sx={{ color: '#FF6347' }}
                    >
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleAddToWishlist(product)}
                      sx={{ color: '#FF6347' }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      size="small"
                      sx={{
                        background:
                          'linear-gradient(to right, #FF7F50, #FF4500)',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default CategoriesPage;
