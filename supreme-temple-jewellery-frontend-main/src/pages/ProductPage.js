// frontend/src/pages/ProductDetails.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  CardMedia,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../services/api';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        // Make sure there's no extra space or hidden character on this line
        const data = await fetchProductDetails(id);
        setProduct(data);
        setLoading(false);

        if (data?.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(product._id)) {
      cart.push(product._id);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart');
    } else {
      alert('Already in cart');
    }
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(product._id)) {
      wishlist.push(product._id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Added to wishlist');
    } else {
      alert('Already in wishlist');
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Loading product details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column: Images */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, mb: 2, textAlign: 'center' }}>
            {selectedImage ? (
              <CardMedia
                component="img"
                image={selectedImage}
                alt={product.name}
                sx={{
                  maxHeight: 500,
                  width: 'auto',
                  mx: 'auto',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Typography>No image available</Typography>
            )}
          </Paper>

          {product.images && product.images.length > 1 && (
            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto' }}>
              {product.images.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    border:
                      selectedImage === img
                        ? '2px solid #1976d2'
                        : '1px solid #ccc',
                    borderRadius: 1,
                    cursor: 'pointer',
                    width: 80,
                    height: 80,
                    flex: '0 0 auto',
                  }}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
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
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ₹{product.price}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Category: {product.category || 'N/A'}
          </Typography>

          {/* Buttons */}
          <Box sx={{ mt: 2, mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </Button>
          </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description ||
              'No description provided. This is where you can add more details about the product, materials, or specs.'}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {product.description ||
            'Detailed description goes here. You can explain how this item is crafted, usage instructions, or any relevant details to help buyers.'}
        </Typography>
      </Box>
    </Container>
  );
}

export default ProductDetails;
