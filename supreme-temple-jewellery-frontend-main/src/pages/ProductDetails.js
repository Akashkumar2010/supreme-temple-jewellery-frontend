// src/pages/ProductDetails.js

import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
  Tabs,
  Tab,
  Divider,
  Rating,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Box,
} from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import { fetchProductDetails, fetchRelatedProducts } from '../services/api';
import { useTheme } from '@mui/material/styles';
import ProductCard from '../components/ProductCard'; // Import ProductCard

function ProductDetails() {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  // State variables
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [ratingValue] = useState(4.3);
  const [reviewCount] = useState(12);
  const [inStock] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [videoOpen, setVideoOpen] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedError, setRelatedError] = useState('');

  // Calculate hours until midnight for delivery message
  const getHoursUntilMidnight = () => {
    const now = new Date();
    return Math.max(24 - now.getHours(), 0);
  };

  const getDeliveryMessage = () => {
    const hoursLeft = getHoursUntilMidnight();
    return hoursLeft === 0
      ? 'If you order now, your product will be delivered within 25 days.'
      : `If you order within the next ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''} (before midnight), your product will be delivered within 25 days.`;
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductDetails(id);
        // Ensure at least 3 images are available
        if (!data.images || data.images.length < 3) {
          data.images = [
            'https://via.placeholder.com/600x600.png?text=Photo1',
            'https://via.placeholder.com/600x600.png?text=Photo2',
            'https://via.placeholder.com/600x600.png?text=Photo3',
          ];
        }
        setProduct(data);
        setSelectedImage(data.images[0]);
        setLoading(false);

        // Fetch related products based on category
        if (data.category) {
          try {
            const relatedData = await fetchRelatedProducts(data.category, id);
            // Limit to 4 related products
            setRelatedProducts(relatedData.slice(0, 4));
            setRelatedLoading(false);
          } catch (relErr) {
            console.error('Error fetching related products:', relErr);
            setRelatedError('Failed to fetch related products.');
            setRelatedLoading(false);
          }
        } else {
          setRelatedLoading(false);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };
    getProductDetails();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddToCart = productId => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      setSnackbar({
        open: true,
        message: 'Added to cart',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Already in cart',
        severity: 'info',
      });
    }
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(product._id)) {
      wishlist.push(product._id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setSnackbar({
        open: true,
        message: 'Added to wishlist',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Already in wishlist',
        severity: 'info',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenVideo = () => setVideoOpen(true);
  const handleCloseVideo = () => setVideoOpen(false);

  if (loading) {
    return (
      <Container
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading product details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          to={`/categories/${(product.category || '')
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
          underline="hover"
          color="inherit"
        >
          {product.category || 'Category'}
        </MuiLink>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={5}>
        {/* Left Column: Image and Thumbnails */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            {selectedImage ? (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%', // 1:1 Aspect Ratio
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ) : (
              <Typography>No image available</Typography>
            )}
            {product.video && (
              <IconButton
                aria-label="play video"
                onClick={handleOpenVideo}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              >
                <VisibilityIcon />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  Watch Video
                </Typography>
              </IconButton>
            )}
          </Paper>

          {/* Thumbnails */}
          {product.images?.length >= 3 && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 2, overflowX: 'auto', pb: 1 }}
            >
              {product.images.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    border:
                      selectedImage === img
                        ? `2px solid ${theme.palette.primary.main}`
                        : '2px solid transparent',
                    borderRadius: 1,
                    cursor: 'pointer',
                    flexShrink: 0,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Right Column: Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {product.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Rating
              name="read-only"
              value={ratingValue}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              ({reviewCount} reviews)
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.secondary.main, mb: 1 }}
          >
            ₹{product.price.toLocaleString()}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              color: inStock ? 'success.main' : 'error.main',
              fontWeight: 'bold',
            }}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={() => handleAddToCart(product._id)}
              sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient background
                '&:hover': {
                  background:
                    'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                },
              }}
              disabled={!inStock}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              startIcon={<FavoriteBorderIcon />}
              onClick={handleAddToWishlist}
              sx={{
                border: '2px solid',
                borderImage: 'linear-gradient(45deg, #FE6B8B, #FF8E53) 1', // Gradient border
                background: 'transparent',
                color: theme.palette.primary.main,
                '&:hover': {
                  borderImage: 'linear-gradient(45deg, #FF8E53, #FE6B8B) 1',
                  backgroundColor: 'rgba(29, 38, 113, 0.04)',
                },
              }}
            >
              Add to Wishlist
            </Button>
          </Box>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="body1">{getDeliveryMessage()}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Tabs Section */}
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ mb: 2 }}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Description" />
          <Tab label="Additional Info" />
          <Tab label="Reviews" />
        </Tabs>
        <Box>
          {activeTab === 0 && (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {product.description || 'No description available.'}
            </Typography>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Material:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.material || 'Premium quality materials used.'}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Shipping:
              </Typography>
              <Typography variant="body1">
                {product.shipping
                  ? product.shipping
                  : '2-3 business days shipping available.'}
              </Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box>
              {reviewCount > 0 ? (
                Array.from({ length: reviewCount }).map((_, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 0.5,
                      }}
                    >
                      <Rating
                        name={`review-rating-${index}`}
                        value={ratingValue}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        User {index + 1}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ ml: 4 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No reviews yet.</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Related Products Section */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Related Products
        </Typography>
        {relatedLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 4,
            }}
          >
            <CircularProgress color="primary" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading related products...
            </Typography>
          </Box>
        ) : relatedError ? (
          <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
            {relatedError}
          </Typography>
        ) : relatedProducts.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {relatedProducts.map(relatedProduct => (
                <Grid
                  item
                  key={relatedProduct._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <ProductCard
                    product={relatedProduct}
                    onAddToCart={handleAddToCart}
                  />
                </Grid>
              ))}
            </Grid>
            {/* Explore Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  navigate(
                    `/categories/${(product.category || '')
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`
                  )
                }
                sx={{
                  background:
                    'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Gradient color
                  color: '#fff',
                  paddingX: 4,
                  paddingY: 1.5,
                  '&:hover': {
                    background:
                      'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                  },
                }}
              >
                Explore More
              </Button>
            </Box>
          </>
        ) : (
          <Typography sx={{ textAlign: 'center' }}>
            No related products found.
          </Typography>
        )}
      </Box>

      {/* Video Modal */}
      <Modal
        open={videoOpen}
        onClose={handleCloseVideo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="product-video-modal"
        aria-describedby="modal-to-display-product-video"
      >
        <Fade in={videoOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '80%', md: '60%' },
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
              outline: 'none',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseVideo}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'grey.500',
              }}
            >
              <CloseIcon />
            </IconButton>
            <video
              src={product.video}
              controls
              style={{ width: '100%', borderRadius: '8px' }}
            ></video>
          </Box>
        </Fade>
      </Modal>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductDetails;
