import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
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
  Container,
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

// Constants moved outside component for better performance
const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'INR', label: 'INR' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

const NAV_LINKS = [
  { title: 'Home', path: '/' },
  { title: 'Products', path: '/products' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact Us', path: '/contact' },
];

const SECONDARY_NAV_LINKS = [
  { title: 'Head Full Set', path: '/categories/headfullset' },
  { title: 'Bangles', path: '/categories/bangles' },
  { title: 'Necklace & Malai', path: '/categories/necklace-malai' },
  { title: 'Otiyanam', path: '/categories/otiyanam' },
  { title: 'Other Accessories', path: '/categories/other-accessories' },
];

// Common button styles
const COMMON_BUTTON_STYLES = {
  background: '#FFD700',
  color: '#000',
  fontWeight: 'bold',
  '&:hover': {
    background: '#CFA700',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.2s ease',
  fontSize: { xs: '0.9rem', sm: '1rem' },
  py: { xs: 1, sm: 1.5 },
};

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Memoized window resize handler
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // Window resize effect
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Cart count effect
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cartItems.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  // Currency initialization effect
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (
      savedCurrency &&
      CURRENCY_OPTIONS.some(opt => opt.value === savedCurrency)
    ) {
      setCurrency(savedCurrency);
    }
  }, [setCurrency]);

  // Memoized handlers
  const handleCurrencyChange = useCallback(
    event => {
      const newCurrency = event.target.value;
      setCurrency(newCurrency);
      localStorage.setItem('currency', newCurrency);
    },
    [setCurrency]
  );

  const handleDrawerToggle = useCallback(
    open => event => {
      if (
        event?.type === 'keydown' &&
        (event?.key === 'Tab' || event?.key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    },
    []
  );

  const handleLogoutClick = useCallback(() => {
    logout();
    setDrawerOpen(false);
  }, [logout]);

  // Memoized components
  const CurrencySelect = useMemo(() => {
    const SelectComponent = ({ mobile = false }) => (
      <FormControl
        variant="standard"
        size="small"
        sx={mobile ? { width: '100%' } : { minWidth: 80, ml: 3 }}
      >
        <Select
          value={currency}
          onChange={handleCurrencyChange}
          sx={{
            color: '#fff',
            '&:before': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover:not(.Mui-disabled):before': { borderColor: '#FFD700' },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
              },
            },
          }}
        >
          {CURRENCY_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
    return SelectComponent;
  }, [currency, handleCurrencyChange]);

  // Memoized values
  const logoSrc = useMemo(
    () => (windowWidth < 768 ? MobileLogo : DesktopLogo),
    [windowWidth]
  );
  const logoHeight = useMemo(
    () => (windowWidth < 380 ? '40px' : '50px'),
    [windowWidth]
  );

  // Active link check
  const isActiveLink = useCallback(
    path => location.pathname === path,
    [location.pathname]
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: '#0A0A0A',
          color: '#fff',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
          padding: { xs: '5px 0', md: '10px 0' },
          borderBottom: '3px solid #FFD700',
          zIndex: theme => theme.zIndex.drawer + 2,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 1, sm: 2, md: 5 },
              minHeight: { xs: '56px', sm: '64px' },
            }}
          >
            {/* Mobile Menu Toggle */}
            <IconButton
              aria-label="Open menu"
              color="inherit"
              sx={{
                display: { xs: 'flex', md: 'none' },
                padding: { xs: '8px', sm: '12px' },
              }}
              onClick={handleDrawerToggle(true)}
            >
              <MenuIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
            </IconButton>

            {/* Logo */}
            <Box
              sx={{
                flexGrow: { xs: 1, md: 0 },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Link to="/" aria-label="Home">
                <img
                  src={logoSrc}
                  alt="Supreme Temple Jewelry Logo"
                  style={{
                    height: logoHeight,
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box
              component="nav"
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 3,
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              {NAV_LINKS.map(link => (
                <Button
                  key={link.title}
                  color="inherit"
                  component={Link}
                  to={link.path}
                  aria-current={isActiveLink(link.path) ? 'page' : undefined}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    '&:hover': { color: '#FFD700', transform: 'scale(1.05)' },
                    transition: '0.3s ease',
                    ...(isActiveLink(link.path) && {
                      color: '#FFD700',
                    }),
                  }}
                >
                  {link.title}
                </Button>
              ))}

              <CurrencySelect />

              {/* Login/Logout and Admin Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {user?.isAdmin && (
                  <Button
                    component={Link}
                    to="/admin/dashboard"
                    aria-label="Admin Dashboard"
                    sx={COMMON_BUTTON_STYLES}
                  >
                    Admin
                  </Button>
                )}
                {user ? (
                  <Button
                    onClick={logout}
                    aria-label="Logout"
                    sx={COMMON_BUTTON_STYLES}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to="/admin"
                    aria-label="Login"
                    sx={COMMON_BUTTON_STYLES}
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
                ml: { xs: 1, sm: 2 },
              }}
            >
              <IconButton
                component={Link}
                to="/wishlist"
                aria-label="Wishlist"
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
                aria-label={`Shopping Cart (${cartCount} items)`}
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
        </Container>
      </AppBar>

      {/* Toolbar placeholder */}
      <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' } }} />

      {/* Secondary Navbar */}
      <Container maxWidth="xl">
        <Box
          component="nav"
          aria-label="Product Categories"
          sx={{
            position: 'sticky',
            top: { xs: '56px', sm: '64px' },
            backgroundColor: '#fff',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            zIndex: theme => theme.zIndex.drawer + 1,
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 1.5 },
            px: { xs: 1, sm: 2, md: 5 },
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            margin: '0 auto',
          }}
        >
          {SECONDARY_NAV_LINKS.map(link => (
            <Button
              key={link.title}
              component={Link}
              to={link.path}
              aria-current={isActiveLink(link.path) ? 'page' : undefined}
              sx={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: { xs: '11px', sm: '12px', md: '14px' },
                whiteSpace: 'nowrap',
                borderRadius: '20px',
                px: { xs: 1.5, sm: 2 },
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
                ...(isActiveLink(link.path) && {
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                }),
              }}
            >
              {link.title}
            </Button>
          ))}
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '85%', sm: 300 },
            maxWidth: '100%',
          },
        }}
      >
        <Box
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
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
              onClick={handleDrawerToggle(false)}
              color="inherit"
              aria-label="Close menu"
              sx={{ padding: { xs: '8px', sm: '12px' } }}
            >
              <CloseIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
            </IconButton>
          </Box>

          <List component="nav" sx={{ py: 0 }}>
            {NAV_LINKS.map(link => (
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
                  onClick={handleDrawerToggle(false)}
                  selected={isActiveLink(link.path)}
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

          <List component="nav" sx={{ py: 0 }}>
            {SECONDARY_NAV_LINKS.map(link => (
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
                  onClick={handleDrawerToggle(false)}
                  selected={isActiveLink(link.path)}
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

            {/* Mobile Login/Logout and Admin Buttons */}
            <Box
              sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {user?.isAdmin && (
                <Button
                  component={Link}
                  to="/admin/dashboard"
                  fullWidth
                  onClick={handleDrawerToggle(false)}
                  aria-label="Admin Dashboard"
                  sx={COMMON_BUTTON_STYLES}
                >
                  Admin
                </Button>
              )}
              {user ? (
                <Button
                  onClick={handleLogoutClick}
                  fullWidth
                  aria-label="Logout"
                  sx={COMMON_BUTTON_STYLES}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/admin"
                  fullWidth
                  onClick={handleDrawerToggle(false)}
                  aria-label="Login"
                  sx={COMMON_BUTTON_STYLES}
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
