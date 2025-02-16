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
    transition: {
      delay: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const sectionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Subtle hover effect for cards
const tiltHover = {
  hover: {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 150 },
  },
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
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
        backgroundImage: 'url("/moroccan-flower.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
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
            background: `url("https://www.indiannatya.com/my_contentz/uploads/2022/11/banner6.jpg") 
                         no-repeat center center`,
            backgroundSize: 'cover',
            backgroundAttachment: {
              xs: 'scroll',
              md: 'fixed',
            },
            // We'll still do a diagonal clip on bottom:
            clipPath: {
              xs: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
              md: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            },
            overflow: 'hidden',
            // Dark overlay
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
            // Wave at the bottom using an absolutely positioned SVG
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
              // Make sure wave is on top of overlay but behind hero text
            },
          }}
        >
          {/* Hero Content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 3, // above overlay & wave
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

        {/* --- Quick Selection (Categories) --- */}
        <Container sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 5,
              fontWeight: 'bold',
              color: '#C99C33', // Elegant Gold
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
                  <Box sx={{ p: 2 }}>
                    <motion.div variants={tiltHover} whileHover="hover">
                      <Card
                        sx={{
                          borderRadius: '15px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          boxShadow: '0px 4px 10px rgba(201, 156, 51, 0.3)',
                          transition:
                            'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 8px 20px rgba(201, 156, 51, 0.4)',
                          },
                          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Soft Glassmorphism
                          backdropFilter: 'blur(10px)',
                        }}
                        onClick={() => handleCategoryClick(category.link)}
                      >
                        <CardMedia
                          component="img"
                          image={category.image}
                          alt={category.name}
                          height="220"
                          sx={{
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease-in-out',
                            '&:hover': { opacity: 0.85 },
                          }}
                        />
                        <CardContent
                          sx={{
                            textAlign: 'center',
                            p: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              mb: 2,
                              fontWeight: 'bold',
                              fontFamily: "'Poppins', sans-serif",
                              color: '#5A463C', // Rich, earthy brown
                            }}
                          >
                            {category.name}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              background:
                                'linear-gradient(135deg, #C99C33, #E0B769)', // Luxurious Gold
                              color: '#fff',
                              fontWeight: 'bold',
                              textTransform: 'capitalize',
                              borderRadius: '20px',
                              px: 3,
                              py: 1,
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                background:
                                  'linear-gradient(135deg, #B3882F, #D4AF37)',
                                transform: 'translateY(-3px)',
                              },
                              display: 'block',
                              mx: 'auto',
                              boxShadow: '0px 4px 10px rgba(201, 156, 51, 0.4)',
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
            backgroundColor: '#fa8302', // Earthy Orange
            color: '#fff',
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
                  <motion.div variants={sectionItemVariants}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        fontSize: { xs: '1.75rem', md: '2.125rem' },
                      }}
                    >
                      Customise your dance costume and jewellery
                    </Typography>
                  </motion.div>
                  <motion.div variants={sectionItemVariants}>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                      Talk to our expert and get your dance costume and
                      accessories tailored exactly to your style and
                      measurements.
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

              {/* Right side: Local video */}
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
          {/* bottom wave */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '80px',
              background: '#fa8302',
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
            sx={{ textAlign: 'center', mb: 5 }}
          >
            Featured Products
          </Typography>
          <motion.div
            variants={sectionContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={3}>
              {featuredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    variants={sectionItemVariants}
                    whileHover="hover"
                    style={{ height: '100%' }}
                  >
                    <motion.div variants={tiltHover}>
                      <Card
                        sx={{
                          borderRadius: '15px',
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={product.image}
                          alt={product.name}
                          height="220"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {product.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {product.price}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="contained"
                            sx={{
                              background: '#fa8302', // Earthy Orange
                              color: '#fff',
                              fontWeight: 'bold',
                              textTransform: 'capitalize',
                              width: '100%',
                              '&:hover': {
                                background: '#e67300',
                              },
                            }}
                          >
                            Add to Cart
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
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
            sx={{ textAlign: 'center', mb: 5 }}
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
                  whileHover={{ scale: 1.02 }}
                  style={{ transformOrigin: 'center' }}
                >
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'box-shadow 0.3s ease',
                      ':hover': {
                        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
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
                        transition: 'box-shadow 0.3s ease',
                        ':hover': {
                          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
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
