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

// Currency options constant
const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'INR', label: 'INR' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect for cart count
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

  // Effect for initializing currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (
      savedCurrency &&
      CURRENCY_OPTIONS.some(opt => opt.value === savedCurrency)
    ) {
      setCurrency(savedCurrency);
    }
  }, [setCurrency]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCurrencyChange = event => {
    const newCurrency = event.target.value;
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  // Currency Select Component for reusability
  const CurrencySelect = ({ mobile = false }) => (
    <FormControl
      variant="standard"
      size="small"
      sx={mobile ? { width: '100%' } : { minWidth: 80, ml: 3 }}
    >
      <Select
        value={currency}
        onChange={handleCurrencyChange}
        sx={{ color: '#fff' }}
      >
        {CURRENCY_OPTIONS.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

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
        position="fixed"
        sx={{
          background: '#0A0A0A',
          color: '#fff',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
          padding: { xs: '5px 0', md: '10px 0' },
          borderBottom: '3px solid #FFD700',
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 1, sm: 2, md: 5 },
            minHeight: { xs: '56px', sm: '64px' },
          }}
        >
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            sx={{
              display: { xs: 'flex', md: 'none' },
              padding: { xs: '8px', sm: '12px' },
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
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
                src={windowWidth < 768 ? MobileLogo : DesktopLogo}
                alt="Logo"
                style={{
                  height: windowWidth < 380 ? '40px' : '50px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
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

            {/* Desktop Currency Select */}
            <CurrencySelect />

            {/* Login/Logout and Admin Buttons */}
            <Box sx={{ p: 2, textAlign: 'center', display: 'flex', gap: 2 }}>
              {user ? (
                <>
                  {user.isAdmin && (
                    <Button
                      component={Link}
                      to="/admin/dashboard"
                      sx={{
                        background: '#FFD700',
                        color: '#000',
                        fontWeight: 'bold',
                        '&:hover': { background: '#CFA700' },
                      }}
                    >
                      Admin
                    </Button>
                  )}
                  <Button
                    onClick={logout}
                    sx={{
                      background: '#FFD700',
                      color: '#000',
                      fontWeight: 'bold',
                      '&:hover': { background: '#CFA700' },
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/admin"
                  sx={{
                    background: '#FFD700',
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': { background: '#CFA700' },
                  }}
                >
                  Log-in
                </Button>
              )}
            </Box>
          </Box>

          {/* Icons */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, sm: 2 },
              marginLeft: { xs: 1, sm: 2 },
            }}
          >
            <IconButton
              component={Link}
              to="/wishlist"
              sx={{
                color: '#FFD700',
                padding: { xs: '8px', sm: '12px' },
              }}
            >
              <FavoriteBorderIcon
                sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
              />
            </IconButton>
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                color: '#FFD700',
                padding: { xs: '8px', sm: '12px' },
              }}
            >
              <Badge
                badgeContent={cartCount}
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    minWidth: { xs: '18px', sm: '20px' },
                    height: { xs: '18px', sm: '20px' },
                  },
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Toolbar placeholder to prevent content from hiding under fixed AppBar */}
      <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' } }} />

      {/* Secondary Navbar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 1 },
          px: { xs: 0.5, sm: 1, md: 2 },
          background: 'transparent',
          position: 'relative',
          zIndex: 1,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '& .MuiButton-root': {
            color: '#000',
            fontWeight: 'bold',
            borderRadius: '20px',
            px: { xs: 1.5, sm: 2 },
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
            },
          },
        }}
      >
        {secondaryNavLinks.map(link => (
          <Button
            key={link.title}
            component={Link}
            to={link.path}
            sx={{
              fontSize: { xs: '11px', sm: '12px', md: '14px' },
              whiteSpace: 'nowrap',
              py: { xs: 0.5, sm: 1 },
            }}
          >
            {link.title}
          </Button>
        ))}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '85%', sm: 300 },
            maxWidth: '100%',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            bgcolor: '#0A0A0A',
            color: '#fff',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: { xs: 1.5, sm: 2 },
              bgcolor: '#FFD700',
            }}
          >
            <Typography
              variant="h6"
              color="#000"
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              Menu
            </Typography>
            <IconButton
              onClick={toggleDrawer(false)}
              color="inherit"
              sx={{ padding: { xs: '8px', sm: '12px' } }}
            >
              <CloseIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
            </IconButton>
          </Box>

          <List sx={{ py: 0 }}>
            {navLinks.map(link => (
              <ListItem
                key={link.title}
                disablePadding
                sx={{
                  '& .MuiListItemButton-root': {
                    py: { xs: 1.5, sm: 2 },
                  },
                }}
              >
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText
                    primary={link.title}
                    primaryTypographyProps={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

          <List sx={{ py: 0 }}>
            {secondaryNavLinks.map(link => (
              <ListItem
                key={link.title}
                disablePadding
                sx={{
                  '& .MuiListItemButton-root': {
                    py: { xs: 1.5, sm: 2 },
                  },
                }}
              >
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText
                    primary={link.title}
                    primaryTypographyProps={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography
              variant="body1"
              sx={{
                color: '#fff',
                mb: 1,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Select Currency
            </Typography>
            <CurrencySelect mobile />

            <Box sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
              {user ? (
                <>
                  {user.isAdmin && (
                    <Button
                      component={Link}
                      to="/admin/dashboard"
                      fullWidth
                      onClick={toggleDrawer(false)}
                      sx={{
                        background: '#FFD700',
                        color: '#000',
                        fontWeight: 'bold',
                        '&:hover': { background: '#CFA700' },
                        mb: 1,
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                      }}
                    >
                      Admin
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      logout();
                      toggleDrawer(false)();
                    }}
                    fullWidth
                    sx={{
                      background: '#FFD700',
                      color: '#000',
                      fontWeight: 'bold',
                      '&:hover': { background: '#CFA700' },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/admin"
                  fullWidth
                  onClick={toggleDrawer(false)}
                  sx={{
                    background: '#FFD700',
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': { background: '#CFA700' },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Log-in
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
