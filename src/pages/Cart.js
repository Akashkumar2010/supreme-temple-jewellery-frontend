import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import emailjs from 'emailjs-com'; // Email.js for sending emails
import { fetchProducts } from '../services/api'; // Ensure the path is correct

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    additionalInfo: '',
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);

        if (storedCart.length === 0) {
          setProducts([]);
          return;
        }

        const data = await fetchProducts();
        if (!data || !Array.isArray(data.products)) {
          throw new Error('Invalid data structure from fetchProducts');
        }

        const filteredProducts = data.products.filter(product =>
          storedCart.includes(product._id)
        );

        const initialQuantities = {};
        filteredProducts.forEach(product => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);

        setProducts(filteredProducts);
      } catch (err) {
        console.error('Error loading cart:', err);
        setError('Failed to load cart. Please try again later.');
      }
    };

    loadCart();
  }, []);

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(1, parseInt(value, 10) || 1);
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const calculateSubtotal = () =>
    products.reduce((sum, product) => {
      const quantity = quantities[product._id] || 1;
      return sum + product.price * quantity;
    }, 0);

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmitOrder = () => {
    const orderSummary = products.map(product => ({
      name: product.name,
      price: product.price,
      quantity: quantities[product._id],
    }));

    const customerEmailContent = {
      customer_name: userDetails.name,
      email: userDetails.email,
      order_details: orderSummary
        .map(
          item =>
            `${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`
        )
        .join('\n'),
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };

    const adminEmailContent = {
      customer_name: userDetails.name,
      customer_email: userDetails.email,
      customer_mobile: userDetails.mobile,
      customer_address: `${userDetails.address}, ${userDetails.city}, ${userDetails.state}, ${userDetails.country} - ${userDetails.pincode}`,
      customer_info: userDetails.additionalInfo,
      order_details: customerEmailContent.order_details,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };

    console.log('Admin email content:', adminEmailContent); // Debugging the admin email payload

    // Send email to the customer
    emailjs
      .send(
        'service_jesy999', // Replace with your Email.js service ID
        'template_zygqwk6', // Replace with your Email.js customer email template ID
        customerEmailContent,
        'iFC2Fkj60JI5NyRn7' // Replace with your Email.js public key
      )
      .then(() => {
        console.log('Customer email sent successfully.');
      })
      .catch(error => {
        console.error('Error sending customer email:', error);
        alert('Failed to send confirmation email to the customer.');
      });

    // Send email to the admin
    emailjs
      .send(
        'service_jesy999', // Replace with your Email.js service ID
        'template_oj457np', // Replace with your Email.js admin email template ID
        adminEmailContent,
        'iFC2Fkj60JI5NyRn7' // Replace with your Email.js public key
      )
      .then(() => {
        console.log('Admin email sent successfully.');
        alert('Order placed successfully!');
        setOpenDialog(false);
        setCartItems([]);
        setProducts([]);
        localStorage.removeItem('cart');
      })
      .catch(error => {
        console.error('Error sending admin email:', error);
        alert('Failed to notify the admin.');
      });
  };

  const handleRemoveFromCart = productId => {
    const updatedCart = cartItems.filter(id => id !== productId);
    setCartItems(updatedCart);
    setProducts(products.filter(product => product._id !== productId));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/moroccan-flower.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensures the background spans the full page height
        padding: '2rem',
      }}
    >
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {products.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  {products.map(product => (
                    <Grid item xs={12} key={product._id}>
                      <Card sx={{ display: 'flex', p: 2 }}>
                        <CardMedia
                          component="img"
                          sx={{
                            width: 150,
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                          image={product.images[0] || '/placeholder-image.jpg'}
                          alt={product.name}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            ml: 2,
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                            >
                              Category: {product.category}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.primary"
                            >
                              Price: ₹{product.price.toFixed(2)}
                            </Typography>
                          </CardContent>
                          <CardActions
                            sx={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ mr: 1 }}>Quantity:</Typography>
                              <TextField
                                type="number"
                                size="small"
                                value={quantities[product._id]}
                                onChange={e =>
                                  handleQuantityChange(
                                    product._id,
                                    e.target.value
                                  )
                                }
                                inputProps={{ min: 1 }}
                                sx={{ width: 60 }}
                              />
                            </Box>
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveFromCart(product._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    backgroundColor: '#f7f7f7',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Order Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography>Subtotal</Typography>
                    <Typography>₹{subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography>Tax (10%)</Typography>
                    <Typography>₹{tax.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">₹{total.toFixed(2)}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setOpenDialog(true)}
                    sx={{ mb: 2 }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>Enter Your Details</DialogTitle>
              <DialogContent>
                {Object.keys(userDetails).map(key => (
                  <TextField
                    key={key}
                    label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    fullWidth
                    margin="normal"
                    value={userDetails[key]}
                    onChange={e =>
                      setUserDetails(prev => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmitOrder}>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </div>
  );
}

export default Cart;
