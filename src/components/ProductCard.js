import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'error', 'info', 'warning'
  });

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Navigate to the product details page
  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  // Add to Wishlist
  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(product._id)) {
      wishlist.push(product._id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setSnackbar({
        open: true,
        message: 'Item added to Wishlist',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Item already in Wishlist',
        severity: 'info',
      });
    }
  };

  // Add to Cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(product._id)) {
      cart.push(product._id);
      localStorage.setItem('cart', JSON.stringify(cart));
      setSnackbar({
        open: true,
        message: 'Item added to Cart',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Item already in Cart',
        severity: 'info',
      });
    }
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.3s',
          cursor: 'pointer',
          border: '1px solid', // Added outline
          borderColor: 'grey.300', // Neutral border color
          borderRadius: '8px', // Optional rounded corners
          '&:hover': {
            boxShadow: 6,
            borderColor: 'primary.main', // Highlight border on hover
          },
        }}
      >
        {product.images && product.images[0] && (
          <CardMedia
            component="img"
            sx={{ height: 200, objectFit: 'cover' }}
            image={product.images[0]}
            alt={product.name}
          />
        )}

        <CardContent>
          <Typography variant="h6" noWrap>
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            ₹{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
        </CardContent>

        <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
          <Button
            size="small"
            onClick={e => {
              e.stopPropagation(); // Prevent navigating to product details
              handleAddToWishlist();
            }}
          >
            Wishlist
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={e => {
              e.stopPropagation(); // Prevent navigating to product details
              handleAddToCart();
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000} // Snackbar will auto-close after 3 seconds
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
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
