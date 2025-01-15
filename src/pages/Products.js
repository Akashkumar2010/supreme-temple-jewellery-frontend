import React, { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
  Pagination,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import { fetchProducts, fetchCategories } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 9;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'info', 'error', or 'warning'
  });

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const params = {
          page: currentPage,
          limit: productsPerPage,
        };
        if (searchQuery) params.search = searchQuery;
        if (category) params.category = category;
        if (priceRange[0] > 0) params.minPrice = priceRange[0];
        if (priceRange[1] < 10000) params.maxPrice = priceRange[1];

        const data = await fetchProducts(params);
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / productsPerPage));
        setError('');
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to fetch products.');
      }
    };

    fetchFilteredProducts();
  }, [searchQuery, category, priceRange, currentPage]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoadingCategories(false);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to fetch categories.');
        setLoadingCategories(false);
      }
    };

    getCategories();
  }, []);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handlePriceChange = e => {
    const { name, value } = e.target;
    setPriceRange(prev => {
      if (name === 'minPrice') {
        return [Number(value), prev[1]];
      } else {
        return [prev[0], Number(value)];
      }
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategory('');
    setPriceRange([0, 10000]);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("moroccan-flower.png")', // Replace with the actual path to the background image
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #FF7F50, #FF6347, #FF4500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Explore Our Products
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        {/* Search and Filters */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />

          {loadingCategories ? (
            <Typography>Loading categories...</Typography>
          ) : (
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories.map(cat => (
                  <MenuItem key={cat._id} value={cat.categoryName}>
                    {cat.categoryName.charAt(0).toUpperCase() +
                      cat.categoryName.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            label="Min Price"
            variant="outlined"
            type="number"
            name="minPrice"
            value={priceRange[0]}
            onChange={handlePriceChange}
            sx={{ width: '120px' }}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            type="number"
            name="maxPrice"
            value={priceRange[1]}
            onChange={handlePriceChange}
            sx={{ width: '120px' }}
          />

          <Button
            variant="contained"
            onClick={handleResetFilters}
            sx={{
              background: 'linear-gradient(to right, #FF7F50, #FF6347)',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Reset
          </Button>
        </Box>

        {/* Product Grid */}
        {products.length === 0 ? (
          <Typography>No products found.</Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {products.map(product => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      background: 'linear-gradient(145deg, #FFFFFF, #FFFAFA)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <Link to={`/product/${product._id}`}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={
                          product.images[0] || 'https://via.placeholder.com/300'
                        }
                        alt={product.name}
                        sx={{
                          borderRadius: '15px 15px 0 0',
                          objectFit: 'cover',
                        }}
                      />
                    </Link>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: '#333' }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        ₹{product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontStyle: 'italic',
                          fontSize: '0.9rem',
                          color: '#777',
                        }}
                      >
                        {product.category}
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
                      <Button
                        variant="outlined"
                        startIcon={<FavoriteBorderIcon />}
                        size="small"
                        sx={{ fontWeight: 'bold', color: '#FF6347' }}
                        onClick={() => handleAddToWishlist(product)}
                      >
                        Wishlist
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        size="small"
                        sx={{
                          background:
                            'linear-gradient(to right, #FF7F50, #FF4500)',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
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
    </Box>
  );
}

export default Products;
