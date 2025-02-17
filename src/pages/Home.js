import './Home.css';
import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  Grid,
  CardActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ComingSoon from '../components/ComingSoonTemp.js';

/* ==================== Framer Motion Variants ==================== */
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.2, staggerChildren: 0.1 },
  },
};

const sectionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Subtle hover effect for cards
const tiltHover = {
  hover: { scale: 1.02, transition: { type: 'spring', stiffness: 150 } },
};

// Reusable style for glittering keywords
const glitterStyle = {
  background: 'linear-gradient(90deg, #FFC107, #FF8C00, #FFC107)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'shimmer 2s linear infinite',
};

function Home() {
  const navigate = useNavigate();

  // Example categories for the Quick Selection carousel
  const categories = [
    {
      name: 'HEAD-FULL-SET',
      image:
        'https://silversparkler.in/image/cache/catalog/HFS-0002-228x228.jpg',
      link: '/categories/headfullset',
    },
    {
      name: 'HEAD-BACK-SET',
      image:
        'https://silversparkler.in/image/cache/catalog/HBS-0006-a-500x500.jpg',
      link: '/categories/headbackset',
    },
    {
      name: 'HAIRCLIPS',
      image:
        'https://silversparkler.in/image/cache/catalog/HCS-0003-02-500x500.jpg',
      link: '/categories/hairclips',
    },
    {
      name: 'NECKLACE & MALAI',
      image:
        'https://shanthitailor.com/cdn/shop/files/WhatsAppImage2024-10-18at12.23.09PM.jpg?v=1729249508&width=700',
      link: '/categories/necklace-malai',
    },
    {
      name: 'JHUMKAS',
      image:
        'https://cdn.shopify.com/s/files/1/0764/9224/3242/files/Traditional-Bharatanatyam-Earrings-Jhumki.jpg?v=1685465896',
      link: '/categories/jhumkas',
    },
    {
      name: 'MAATAL',
      image:
        'https://shanthitailor.com/cdn/shop/files/20240929-125312.jpg?v=1727594880&width=700',
      link: '/categories/matal',
    },
    {
      name: 'OTTIYANAM',
      image:
        'https://shanthitailor.com/cdn/shop/files/DSC02418.jpg?v=1734531369&width=700',
      link: '/categories/ottiyanam',
    },
    {
      name: 'OTHER ACCESSORIES',
      image:
        'https://i.etsystatic.com/34168402/r/il/f3bbbb/3671089596/il_570xN.3671089596_q7ad.jpg',
      link: '/categories/other-accessories',
    },
    {
      name: 'EARRINGS',
      image:
        'https://cdn.shopify.com/s/files/1/0764/9224/3242/files/Traditional-Bharatanatyam-Earrings-Jhumki.jpg?v=1685465896',
      link: '/categories/earrings',
    },
    {
      name: 'BANGLES',
      image:
        'https://silversparkler.in/image/cache/catalog/HFS-0002-228x228.jpg',
      link: '/categories/bangles',
    },
  ];

  // Sample Featured Products
  const featuredProducts = [
    {
      name: 'Gold Necklace',
      price: '₹5000',
      image:
        'https://cdn.shopify.com/s/files/1/0764/9224/3242/files/Traditional-Temple-Necklace.jpg?v=1685465799',
    },
    {
      name: 'Bangles Set',
      price: '₹2000',
      image:
        'https://shanthitailor.com/cdn/shop/files/DSC02418.jpg?v=1734531369&width=700',
    },
    {
      name: 'Temple Earrings',
      price: '₹1500',
      image:
        'https://cdn.shopify.com/s/files/1/0764/9224/3242/files/Traditional-Bharatanatyam-Earrings-Jhumki.jpg?v=1685465896',
    },
    {
      name: 'Ottiyanam Belt',
      price: '₹3000',
      image:
        'https://shanthitailor.com/cdn/shop/files/WhatsAppImage2024-10-18at12.23.09PM.jpg?v=1729249508&width=700',
    },
  ];

  // Example blog data
  const blogs = [
    {
      title: 'Bharatanatyam Costume: Unveiling the Rituals and Traditions',
      date: 'Feb 17',
      description: 'Discover the rich tradition and stunning designs...',
      image:
        'https://shanthitailor.com/cdn/shop/files/20240929-125312.jpg?v=1727594880&width=700',
      link: '/blogs/blog1',
    },
    {
      title: 'Significance of Precise Bharatanatyam Measurements',
      date: 'Feb 17',
      description: 'Why precision is key in Bharatanatyam attire design...',
      image:
        'https://silversparkler.in/image/cache/catalog/HFS-0002-228x228.jpg',
      link: '/blogs/blog2',
    },
    {
      title: 'The Legacy of Bharatanatyam Jewelry',
      date: 'Feb 18',
      description: 'Dive into the intricate artistry of temple jewelry...',
      image:
        'https://cdn.shopify.com/s/files/1/0764/9224/3242/files/Traditional-Bharatanatyam-Earrings-Jhumki.jpg?v=1685465896',
      link: '/blogs/blog3',
    },
    {
      title:
        'Indian Classical Dance Costume: Sun Costumes That Will Light Up the Party!',
      date: 'Feb 17',
      description:
        'Step into the spotlight with these dazzling dance costumes...',
      image:
        'https://shanthitailor.com/cdn/shop/files/DSC02418.jpg?v=1734531369&width=700',
      link: '/blogs/blog4',
    },
  ];

  // One big featured blog for the left side
  const featuredBlog = {
    title: 'Featured: Indian Classical Dance Costume',
    date: 'Feb 20',
    description:
      'Step into the spotlight with these mesmerizing designs that truly shine...',
    image:
      'https://www.indiannatya.com/my_contentz/uploads/2022/11/banner6.jpg',
    link: '/blogs/blog5',
  };

  // Slider settings for categories
  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handleCategoryClick = link => {
    navigate(link);
  };

  const handleBlogClick = link => {
    navigate(link);
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, rgba(255,248,230,0.6) 0%, rgba(255,245,220,0.4) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        minHeight: '100vh',
      }}
    >
      <div className="home-page">
        {/** ========================== Hero Section START ========================== **/}
        <Box
          component={motion.div}
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            position: 'relative',
            height: { xs: '500px', md: '800px' },
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            background:
              'url("https://www.indiannatya.com/my_contentz/uploads/2022/11/banner6.jpg") no-repeat center center',
            backgroundSize: 'cover',
            backgroundAttachment: { xs: 'scroll', md: 'fixed' },
            clipPath: {
              xs: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
              md: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            },
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
              zIndex: 1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '120px',
              background: 'url("/wave-bottom.svg") no-repeat bottom center',
              backgroundSize: 'cover',
              zIndex: 2,
            },
          }}
        >
          {/* Hero Content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 3,
              maxWidth: '900px',
              mx: 'auto',
              px: 2,
              py: { xs: 2, md: 6 },
            }}
          >
            {/* Headline */}
            <motion.div variants={heroItemVariants}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  mb: 1,
                  letterSpacing: '1px',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                Welcome to{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Supreme Temple Jewellery
                </span>
              </Typography>
            </motion.div>

            {/* Sub-Headline */}
            <motion.div variants={heroItemVariants}>
              <Typography
                sx={{
                  mt: 1,
                  mb: 4,
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                }}
              >
                We are{' '}
                <strong style={{ fontWeight: 'bold' }}>specialists</strong> in{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                  }}
                >
                  Dance Costumes &amp; Jewelry
                </span>{' '}
                <motion.span
                  whileHover={{ scale: 1.12 }}
                  style={{
                    display: 'inline-block',
                    marginLeft: '6px',
                    fontStyle: 'italic',
                    background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                  }}
                >
                  Since 1967
                </motion.span>
              </Typography>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={heroItemVariants}
              style={{ display: 'flex', justifyContent: 'center', gap: 12 }}
            >
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                  color: '#000',
                  borderRadius: '30px',
                  px: { xs: 2, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '14px', md: '18px' },
                  fontWeight: 'bold',
                  boxShadow: '0px 4px 15px rgba(255, 165, 0, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FF8C00, #FFD700)',
                    transform: 'scale(1.05)',
                    transition: '0.3s ease',
                  },
                }}
                onClick={() => navigate('/products')}
              >
                Shop Now
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                  color: '#000',
                  borderRadius: '30px',
                  px: { xs: 2, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '14px', md: '18px' },
                  fontWeight: 'bold',
                  boxShadow: '0px 4px 15px rgba(255, 165, 0, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #FF8C00, #FFD700)',
                    transform: 'scale(1.05)',
                    transition: '0.3s ease',
                  },
                }}
                onClick={() => navigate('/categories')}
              >
                Explore More
              </Button>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={heroItemVariants}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '700px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)',
                  p: 1,
                  mx: 'auto',
                  mt: 4,
                }}
              >
                <TextField
                  placeholder="Search Bharathanatyam jewellery..."
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#FFD700' }} />
                      </InputAdornment>
                    ),
                    style: {
                      backgroundColor: 'transparent',
                      borderRadius: '50px',
                      fontSize: '16px',
                      color: '#fff',
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      border: 'none',
                      paddingLeft: '10px',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    ml: 1,
                    background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                    color: '#000',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    px: { xs: 2, md: 3 },
                    fontSize: { xs: '14px', md: '16px' },
                    '&:hover': {
                      background: 'linear-gradient(90deg, #FF8C00, #FFD700)',
                      transform: 'scale(1.05)',
                      transition: '0.3s ease',
                    },
                  }}
                  onClick={() => navigate('/search')}
                >
                  Search
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Box>
        {/** ========================== Hero Section END ========================== **/}
        {/* --- Coming Soon Section --- */}
        <ComingSoon />
        {/* --- Quick Selection Section with Fixed Card Size & Enhanced UI --- */}
        <Container sx={{ mt: 8 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 5,
              fontWeight: 'bold',
              color: '#C99C33',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Quick Selection
          </Typography>
          <motion.div
            variants={sectionContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Slider {...sliderSettings}>
              {categories.map((category, index) => (
                <motion.div key={index} variants={sectionItemVariants}>
                  <Box
                    sx={{
                      px: 1,
                      py: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      variants={{
                        hover: {
                          scale: 1.06,
                          rotate: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 200,
                            damping: 10,
                          },
                        },
                      }}
                      whileHover="hover"
                      style={{
                        width: '100%',
                        maxWidth: 340,
                        minWidth: 340,
                        height: 420,
                      }}
                    >
                      <Card
                        sx={{
                          position: 'relative',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))',
                          backdropFilter: 'blur(5px)',
                          '&:hover': {
                            transform: 'scale(1.06)',
                            boxShadow: '0 10px 20px rgba(201, 156, 51, 0.5)',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 'inherit',
                            padding: '2px',
                            background: `linear-gradient(
                              90deg, 
                              #C99C33, 
                              #E0B769, 
                              #FFD700, 
                              #E0B769, 
                              #C99C33
                            )`,
                            backgroundSize: '200% auto',
                            backgroundPosition: '0% 50%',
                            animation: 'borderMove 3s linear infinite',
                            WebkitMask:
                              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            pointerEvents: 'none',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          },
                          '&:hover::before': { opacity: 1 },
                          '@keyframes borderMove': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '100%': { backgroundPosition: '200% 50%' },
                          },
                        }}
                        onClick={() => handleCategoryClick(category.link)}
                      >
                        <Box sx={{ position: 'relative', flex: '0 0 auto' }}>
                          <CardMedia
                            component="img"
                            image={category.image}
                            alt={category.name}
                            sx={{
                              height: 240,
                              width: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease',
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background:
                                'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              '&:hover': { opacity: 1 },
                            }}
                          />
                        </Box>
                        <CardContent
                          sx={{
                            flex: '1 0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 2,
                            textAlign: 'center',
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
                              fontWeight: 'bold',
                              fontFamily: "'Poppins', sans-serif",
                              color: '#5A463C',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                            }}
                          >
                            {category.name}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              background:
                                'linear-gradient(135deg, #C99C33, #E0B769)',
                              color: '#fff',
                              fontWeight: 'bold',
                              textTransform: 'capitalize',
                              borderRadius: '20px',
                              px: 3,
                              py: 1,
                              boxShadow: '0 4px 10px rgba(201, 156, 51, 0.4)',
                              transition: 'background 0.3s, transform 0.3s',
                              '&:hover': {
                                background:
                                  'linear-gradient(135deg, #B3882F, #D4AF37)',
                                transform: 'translateY(-3px)',
                              },
                            }}
                          >
                            Explore
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Box>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </Container>
        {/** ====================== Diagonal / Wave CTA Section START ====================== **/}
        <Box
          sx={{
            position: 'relative',
            mt: 8,
            clipPath: 'polygon(0 4%, 100% 0%, 100% 100%, 0 100%)',
            background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
            color: '#5A463C',
            pb: 6,
          }}
        >
          <Container sx={{ pt: 10 }}>
            <Grid container alignItems="center" spacing={6}>
              {/* Left Side - Text */}
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={sectionContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Shimmering Header with Highlighted Keywords */}
                  <motion.div variants={sectionItemVariants}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        fontSize: { xs: '1.75rem', md: '2.125rem' },
                        textShadow: 'none',
                      }}
                    >
                      Customise your dance{' '}
                      <span style={glitterStyle}>costume</span> and{' '}
                      <span style={glitterStyle}>jewellery</span>
                    </Typography>
                  </motion.div>

                  {/* Shimmering Sub-Text with Highlighted Keywords */}
                  <motion.div variants={sectionItemVariants}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 4, textShadow: 'none' }}
                    >
                      Talk to our <span style={glitterStyle}>expert</span> and
                      get your dance costume and accessories tailored exactly to
                      your <span style={glitterStyle}>style</span> and{' '}
                      <span style={glitterStyle}>measurements</span>.
                    </Typography>
                  </motion.div>

                  <motion.div variants={sectionItemVariants}>
                    <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(90deg, #061f59, #122b76)',
                        color: 'white',
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        padding: { xs: '8px 20px', md: '10px 25px' },
                        borderRadius: '30px',
                        fontSize: { xs: '14px', md: '16px' },
                        '&:hover': {
                          background:
                            'linear-gradient(90deg, #122b76, #061f59)',
                        },
                      }}
                      onClick={() => navigate('/contact')}
                    >
                      Book Now
                    </Button>
                  </motion.div>
                </motion.div>
              </Grid>

              {/* Right Side - Local Video */}
              <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <motion.div
                  variants={sectionContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div variants={sectionItemVariants}>
                    <Box sx={{ overflow: 'hidden', borderRadius: '12px' }}>
                      <video
                        width="100%"
                        height="400"
                        style={{ borderRadius: '8px' }}
                        controls
                        autoPlay
                        muted
                        loop
                      >
                        <source
                          src="/videos/my-custom-video.mp4"
                          type="video/mp4"
                        />
                        {
                          'Your browser does not support the HTML5 video element.'
                        }
                      </video>
                    </Box>
                  </motion.div>
                </motion.div>
              </Grid>
            </Grid>
          </Container>

          {/* Bottom Wave */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '80px',
              background: '#FFECB3',
              clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            }}
          />
        </Box>
        {/** ====================== Diagonal / Wave CTA Section END ====================== **/}

        {/* --- Featured Products --- */}
        <Container sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 5,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#222',
              position: 'relative',
              '&::after': {
                content: '""',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #fa8302, #e67300)',
                display: 'block',
                margin: '8px auto 0',
                borderRadius: '2px',
              },
            }}
          >
            Featured Products
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' },
            }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {featuredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                      height: '100%',
                      perspective: 800,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <Card
                      sx={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        border: '2px solid transparent',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          borderColor: '#e67300', // Only border color changes
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            background:
                              'linear-gradient(45deg, #fa8302, #e67300)',
                            color: '#fff',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            zIndex: 2,
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          Hot
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            height="220"
                            sx={{
                              transition: 'transform 0.4s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                          />
                        </motion.div>
                      </Box>

                      <CardContent
                        sx={{ flexGrow: 1, textAlign: 'center', p: 2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            transition: 'color 0.3s ease',
                            '&:hover': { color: '#e67300' },
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {product.price}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{ p: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            background:
                              'linear-gradient(90deg, #fa8302, #e67300)',
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            width: '100%',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                              transform: 'translateY(-2px) scale(1.05)',
                              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                              background:
                                'linear-gradient(90deg, #e67300, #fa8302)',
                            },
                          }}
                        >
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* --- Latest Blogs --- */}
        <Container sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 5,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              position: 'relative',
              '&::after': {
                content: '""',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #fa8302, #e67300)',
                display: 'block',
                margin: '8px auto 0',
                borderRadius: '2px',
              },
            }}
          >
            Latest Blogs
          </Typography>
          <Grid container spacing={4}>
            {/* Left side: Large featured blog */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={sectionContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={sectionItemVariants}
                  whileHover={{ scale: 1.03 }}
                  style={{ transformOrigin: 'center' }}
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s ease, border 0.3s ease',
                      ':hover': {
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                        border: '2px solid #e67300',
                      },
                      borderRadius: '15px',
                      overflow: 'hidden',
                    }}
                    onClick={() => handleBlogClick(featuredBlog.link)}
                  >
                    <CardMedia
                      component="img"
                      alt={featuredBlog.title}
                      height="300"
                      image={featuredBlog.image}
                      sx={{
                        transition: 'transform 0.4s ease',
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {featuredBlog.date}
                      </Typography>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                      >
                        {featuredBlog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {featuredBlog.description}
                      </Typography>
                      <Button
                        variant="text"
                        sx={{
                          mt: 2,
                          color: '#fa8302',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          transition: 'color 0.3s ease',
                          '&:hover': { color: '#e67300' },
                        }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right side: Smaller blog cards */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={sectionContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {blogs.map((blog, index) => (
                  <motion.div
                    key={index}
                    variants={sectionItemVariants}
                    whileHover={{ scale: 1.02 }}
                    style={{ transformOrigin: 'center', marginBottom: '16px' }}
                  >
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'box-shadow 0.3s ease, border 0.3s ease',
                        ':hover': {
                          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                          border: '2px solid #e67300',
                        },
                        borderRadius: '15px',
                        overflow: 'hidden',
                      }}
                      onClick={() => handleBlogClick(blog.link)}
                    >
                      <Grid container>
                        <Grid item xs={4}>
                          <CardMedia
                            component="img"
                            alt={blog.title}
                            image={blog.image}
                            height="100"
                            sx={{
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%',
                              borderTopLeftRadius: '15px',
                              borderBottomLeftRadius: '15px',
                              transition: 'transform 0.3s ease',
                              '&:hover': { transform: 'scale(1.1)' },
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <CardContent>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              {blog.date}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              sx={{ fontWeight: 'bold' }}
                            >
                              {blog.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {blog.description}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Home;
