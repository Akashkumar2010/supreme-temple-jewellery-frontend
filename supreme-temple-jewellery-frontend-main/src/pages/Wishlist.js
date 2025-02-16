// frontend/src/pages/Wishlist.js

import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Wishlist() {
  useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const storedWishlist =
          JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);

        if (storedWishlist.length === 0) {
          setProducts([]); // Clear products if wishlist is empty
          return;
        }

        const data = await fetchProducts();
        const filtered = data.products.filter(p =>
          storedWishlist.includes(p._id)
        );
        setProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch wishlist products:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = id => {
    const updatedWishlist = wishlist.filter(item => item !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("moroccan-flower.png")', // Replace with your pattern image path
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container sx={{ mt: 4, pb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1d2671',
            mb: 3,
          }}
        >
          Your Wishlist
        </Typography>
        {products.length === 0 ? (
          <Typography
            sx={{
              textAlign: 'center',
              mt: 4,
              fontStyle: 'italic',
              color: '#888',
            }}
          >
            No items in wishlist
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map(p => (
              <Grid
                item
                key={p._id}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ProductCard product={p} />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveFromWishlist(p._id)}
                  sx={{
                    mt: 2,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  Remove from Wishlist
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Wishlist;
