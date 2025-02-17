import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Badge,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AuthContext } from '../context/AuthContext';
import { CurrencyContext } from '../context/CurrencyContext';

// Logos
import DesktopLogo from '../assets/b.png';
import MobileLogo from '../assets/s.png';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cartItems.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleCurrencyChange = event => {
    setCurrency(event.target.value);
    localStorage.setItem('currency', event.target.value);
  };

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'About Us', path: '/about' },
    { title: 'Contact Us', path: '/contact' },
  ];

  const secondaryNavLinks = [
    { title: 'Head Full Set', path: '/categories/headfullset' },
    { title: 'Bangles', path: '/categories/bangles' },
    { title: 'Necklace & Malai', path: '/categories/necklace-malai' },
    { title: 'Otiyanam', path: '/categories/otiyanam' },
    { title: 'Other Accessories', path: '/categories/other-accessories' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <AppBar
        position="static"
        sx={{
          background: '#0A0A0A', // Deep black like Nike's UI
          color: '#fff',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
          padding: '10px 0',
          borderBottom: '3px solid #FFD700', // Gold bottom line
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 5 },
          }}
        >
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Link to="/">
              <img
                src={window.innerWidth < 600 ? MobileLogo : DesktopLogo}
                alt="Logo"
                style={{ height: '50px' }}
              />
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            {navLinks.map(link => (
              <Button
                key={link.title}
                color="inherit"
                component={Link}
                to={link.path}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  '&:hover': { color: '#FFD700', transform: 'scale(1.05)' },
                  transition: '0.3s ease',
                }}
              >
                {link.title}
              </Button>
            ))}

            {/* Only fixing spacing for INR dropdown */}
            <FormControl
              variant="standard"
              size="small"
              sx={{ minWidth: 80, ml: 3 }} // **Fix: Added margin-left (ml: 3) for spacing**
            >
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
            {/* 🔹 Login Button in Mobile Drawer */}
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Button
                component={Link}
                to="/admin"
                fullWidth
                sx={{
                  background: '#FFD700',
                  color: '#000',
                  fontWeight: 'bold',
                  '&:hover': { background: '#CFA700' },
                }}
              >
                Log-in
              </Button>
            </Box>
          </Box>

          {/* Icons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              component={Link}
              to="/wishlist"
              sx={{ color: '#FFD700' }}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton component={Link} to="/cart" sx={{ color: '#FFD700' }}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Secondary Navbar (Visible on Desktop) */}
      <Box
        sx={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'none', md: 'flex' },
          gap: 2,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          padding: '8px 16px',
          zIndex: 10,
        }}
      >
        {secondaryNavLinks.map(link => (
          <Button
            key={link.title}
            component={Link}
            to={link.path}
            sx={{
              borderRadius: '20px',
              padding: '6px 16px',
              background: '#FFD700',
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              '&:hover': { background: '#CFA700' },
            }}
          >
            {link.title}
          </Button>
        ))}
      </Box>

      {/* Mobile Drawer (Includes Secondary Navbar) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 270, bgcolor: '#0A0A0A', color: '#fff', height: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: '#FFD700',
            }}
          >
            <Typography variant="h6" color="#000">
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map(link => (
              <ListItem key={link.title} disablePadding>
                <ListItemButton component={Link} to={link.path}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ bgcolor: '#fff' }} />

          <List>
            {secondaryNavLinks.map(link => (
              <ListItem key={link.title} disablePadding>
                <ListItemButton component={Link} to={link.path}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
              Select Currency
            </Typography>
            <FormControl fullWidth variant="standard" size="small">
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
            {/* 🔹 Login Button in Mobile Drawer */}
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Button
                component={Link}
                to="/admin"
                fullWidth
                sx={{
                  background: '#FFD700',
                  color: '#000',
                  fontWeight: 'bold',
                  '&:hover': { background: '#CFA700' },
                }}
              >
                Log-in
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
