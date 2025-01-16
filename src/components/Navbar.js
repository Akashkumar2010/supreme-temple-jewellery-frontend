// src/components/Navbar.js

import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Badge,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AuthContext } from '../context/AuthContext';
import { CurrencyContext } from '../context/CurrencyContext';
import './Navbar.css';

// Import the logo image
import DesktopLogo from '../assets/SUPREME TEMPLE JEWELRY over.png'; // Replace with your desktop logo path
import MobileLogo from '../assets/logo small.png'; // Replace with your mobile logo path

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  // Removed wishlistCount since badge is being removed from wishlist icon

  useEffect(() => {
    // Fetch cart counts from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);
    // Removed wishlistCount logic
  }, []);

  // State for mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Check if the secondary navbar should be displayed
  const shouldShowSecondaryNavbar =
    location.pathname === '/' || location.pathname.startsWith('/categories');

  // Handle currency change
  const handleCurrencyChange = event => {
    setCurrency(event.target.value);
    localStorage.setItem('currency', event.target.value); // Persist user choice
  };

  // Toggle drawer open/close
  const toggleDrawer = open => event => {
    // Close the drawer when clicking outside or pressing Esc
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Define navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'About Us', path: '/about' },
    { title: 'Contact Us', path: '/contact' },
  ];

  // Define secondary navigation links
  const secondaryNavLinks = [
    { title: 'Head Full Set', path: '/categories/headfullset' },
    { title: 'Bangles', path: '/categories/bangles' },
    { title: 'Necklace & Malai', path: '/categories/necklace-malai' },
    { title: 'Otiyanam', path: '/categories/otiyanam' },
    { title: 'Other Accessories', path: '/categories/other-accessories' },
  ];

  // Define the list content for the drawer
  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          background: 'linear-gradient(90deg, #1d2671, #c33764)',
        }}
      >
        <Typography variant="h6" color="#fff">
          Menu
        </Typography>
        <IconButton onClick={toggleDrawer(false)} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Main Navigation Links */}
      <List>
        {navLinks.map(link => (
          <ListItem key={link.title} disablePadding>
            <ListItemButton component={Link} to={link.path}>
              <ListItemText primary={link.title} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Conditional User/Admin Links */}
        {user ? (
          <>
            {user.role === 'admin' && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/admin">
                  <ListItemText primary="Admin" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Divider />

      {/* Secondary Navigation Links (Hidden on Mobile) */}
      {shouldShowSecondaryNavbar && (
        <List>
          {secondaryNavLinks.map(link => (
            <ListItem key={link.title} disablePadding>
              <ListItemButton component={Link} to={link.path}>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Divider />

      {/* Currency Selector and Wishlist Icon (Only on Mobile) */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          gap: 2,
        }}
      >
        {/* Currency Selector */}
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            label="Currency"
            sx={{ bgcolor: 'white', color: 'black', borderRadius: '4px' }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </Select>
        </FormControl>

        {/* Wishlist Icon */}
        <IconButton
          component={Link}
          to="/wishlist"
          aria-label="Wishlist"
          sx={{
            border: '1px solid #1d2671',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            background: '#c33764',
            color: '#FFF',
            transition: 'transform 0.2s ease, background 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              background: '#1d2671',
            },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Main Navbar */}
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #1d2671, #c33764)', // Jewel-inspired gradient
          color: '#fff',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // Properly align items
            alignItems: 'center', // Vertically center the items
          }}
        >
          {/* Mobile: Hamburger Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              aria-label="menu"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Brand/Logo */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
            }}
          >
            {/* Mobile Logo */}
            <Link to="/" style={{ display: 'flex' }}>
              <img
                src={MobileLogo}
                alt="Mobile Logo"
                style={{
                  height: '50px',
                  width: 'auto',
                  display: 'block',
                }}
                className="mobile-logo"
              />
            </Link>

            {/* Desktop Logo */}
            <Link to="/" style={{ display: 'flex' }}>
              <img
                src={DesktopLogo}
                alt="Desktop Logo"
                style={{
                  height: '70px',
                  width: 'auto',
                  display: 'none',
                }}
                className="desktop-logo"
              />
            </Link>
          </Box>

          {/* Desktop: Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2.5 }}>
            {navLinks.map(link => (
              <Button
                key={link.title}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  padding: '0.5rem 1rem',
                  '&:hover': {
                    color: '#FFE5B4', // Warm gold color for hover
                  },
                }}
              >
                {link.title}
              </Button>
            ))}
            {/* Conditional Links for User/Admin */}
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/admin"
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      padding: '0.5rem 1rem',
                      '&:hover': {
                        color: '#FFE5B4',
                      },
                    }}
                  >
                    Admin
                  </Button>
                )}
                <Button
                  color="inherit"
                  onClick={logout}
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    padding: '0.5rem 1rem',
                    '&:hover': {
                      color: '#FFE5B4',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  padding: '0.5rem 1rem',
                  '&:hover': {
                    color: '#FFE5B4',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Currency Selector (Desktop Only) */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 3 }}>
            <FormControl variant="outlined" size="small">
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                label="Currency"
                sx={{ bgcolor: 'white', color: 'black', borderRadius: '4px' }}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Wishlist Icon and Cart Icon */}
          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            {/* Wishlist Icon (Desktop Only) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                component={Link}
                to="/wishlist"
                aria-label="Wishlist"
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  background: '#1d2671',
                  color: '#FFF',
                  transition: 'transform 0.2s ease, background 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    background: '#c33764',
                  },
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Box>

            {/* Cart Icon (Always Visible on Navbar) */}
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Cart"
              sx={{
                border: '1px solid #FFF',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                background: '#1d2671',
                color: '#FFF',
                transition: 'transform 0.2s ease, background 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  background: '#c33764',
                },
              }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Secondary Navbar (Hidden on Mobile) */}
      {shouldShowSecondaryNavbar && (
        <AppBar
          position="absolute"
          sx={{
            bgcolor: 'Transparent', // Warm gold contrast for secondary navbar
            color: '#1d2671',
            boxShadow: 'none',
            zIndex: 10,
            display: { xs: 'none', md: 'block' }, // Hide on mobile
            top: { md: '85px' }, // Position below the main navbar on desktop
          }}
        >
          <Toolbar
            variant="dense"
            sx={{
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center', // Vertically center the items
              gap: { xs: 1, md: 2 },
              flexWrap: 'nowrap', // Prevent wrapping on small screens
              width: '100%', // Ensure full width for proper centering
              px: { xs: 1, md: 38 }, // Horizontal padding
            }}
          >
            {secondaryNavLinks.map(link => (
              <Button
                key={link.title}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{
                  borderRadius: '50px',
                  padding: '0.3rem 1rem', // Corrected padding value
                  background: '#1d2671',
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: '#c33764',
                  },
                  minWidth: { xs: 'auto', md: '150px' },
                }}
              >
                {link.title}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </>
  );
}

export default Navbar;
