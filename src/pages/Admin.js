// src/pages/Admin.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  CircularProgress,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { AuthContext } from '../context/AuthContext';
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api';

function Admin() {
  const { token } = useContext(AuthContext);

  // State variables
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add'); // 'add' or 'edit'
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    productCode: '',
    category: '',
    description: '',
    images: '',
  });
  const [currentProductId, setCurrentProductId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 16; // Number of products per page

  // useEffect to load products and categories
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { products, total } = await fetchProducts({
          page: currentPage,
          limit: productsPerPage,
        });
        setProducts(products);
        setTotalPages(Math.ceil(total / productsPerPage));
        setError('');
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
      }
    };

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoadingCategories(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories.');
        setLoadingCategories(false);
      }
    };

    loadProducts();
    loadCategories();
  }, [currentPage, productsPerPage]); // Dependencies are currentPage and productsPerPage

  // Handler for pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handler to open dialog for add or edit
  const handleOpenDialog = (type, product = null) => {
    setDialogType(type);
    if (type === 'edit' && product) {
      setCurrentProduct({
        name: product.name,
        price: product.price,
        productCode: product.productCode,
        category: product.category,
        description: product.description,
        images: product.images.join(', '),
      });
      setCurrentProductId(product._id);
    } else {
      setCurrentProduct({
        name: '',
        price: '',
        productCode: '',
        category: '',
        description: '',
        images: '',
      });
      setCurrentProductId(null);
    }
    setOpenDialog(true);
  };

  // Handler to close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct({
      name: '',
      price: '',
      productCode: '',
      category: '',
      description: '',
      images: '',
    });
    setCurrentProductId(null);
    setError('');
    setSuccess('');
  };

  // Handler for form input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for form submission (add/edit)
  const handleSubmit = async () => {
    const { name, price, productCode, category, description, images } =
      currentProduct;
    const imageArray = images.split(',').map(img => img.trim());

    const productData = {
      name,
      price,
      productCode,
      category,
      description,
      images: imageArray,
    };

    try {
      setLoading(true);
      if (dialogType === 'add') {
        await createProduct(productData, token);
        setSuccess('Product added successfully.');
      } else if (dialogType === 'edit') {
        await updateProduct(currentProductId, productData, token);
        setSuccess('Product updated successfully.');
      }
      // Reload products after add/edit
      const { products, total } = await fetchProducts({
        page: currentPage,
        limit: productsPerPage,
      });
      setProducts(products);
      setTotalPages(Math.ceil(total / productsPerPage));
      handleCloseDialog();
    } catch (err) {
      console.error('Error submitting product:', err);
      setError('Failed to submit product.');
    } finally {
      setLoading(false);
    }
  };

  // Handler to delete a product
  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoading(true);
        await deleteProduct(id, token);
        alert('Product deleted successfully');
        // Reload products after deletion
        const { products, total } = await fetchProducts({
          page: currentPage,
          limit: productsPerPage,
        });
        setProducts(products);
        setTotalPages(Math.ceil(total / productsPerPage));
      } catch (err) {
        console.error(
          'Failed to delete product:',
          err.response?.data || err.message
        );
        setError('Failed to delete product.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel - Product Management
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog('add')}
        sx={{ mb: 2 }}
      >
        Add New Product
      </Button>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 6,
                },
              }}
            >
              {product.images && product.images[0] && (
                <CardMedia
                  component="img"
                  height="140"
                  image={product.images[0]}
                  alt={product.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Price: ₹{product.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto' }}>
                <Button
                  size="small"
                  onClick={() => handleOpenDialog('edit', product)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
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

      {/* Dialog for Add/Edit */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {dialogType === 'add' ? 'Add New Product' : 'Edit Product'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Product Name"
              name="name"
              value={currentProduct.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={currentProduct.price}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Product Code"
              name="productCode"
              value={currentProduct.productCode}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={currentProduct.category}
                onChange={handleChange}
                disabled={loadingCategories}
                label="Category"
              >
                {loadingCategories ? (
                  <MenuItem disabled>Loading categories...</MenuItem>
                ) : (
                  categories.map(category => (
                    <MenuItem key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              name="description"
              value={currentProduct.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Images (comma-separated URLs)"
              name="images"
              value={currentProduct.images}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              helperText="Enter image URLs separated by commas"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} />
            ) : dialogType === 'add' ? (
              'Add Product'
            ) : (
              'Update Product'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Admin;
