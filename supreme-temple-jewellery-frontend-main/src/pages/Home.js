// src/pages/Home.js

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
import { ColourfulText } from '../components/ui/ColourfulText';


// Import slick-carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import the ComingSoon component
import ComingSoon from '../components/ComingSoonTemp.js';

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

  // Handlers
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
        {/* --- Hero Section --- */}
        <Box
          sx={{
            position: 'relative',
            height: '650px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'url("https://www.indiannatya.com/my_contentz/uploads/2022/11/banner6.jpg") no-repeat center center',
            backgroundSize: 'cover',
            // Optional: Add a dark overlay for better text visibility
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            },
          }}
        >
          {/* 
            We removed the erroneous 'import' line inside JSX 
            and merged everything into one Box for clarity.
          */}
          <Box sx={{ textAlign: 'center', maxWidth: '700px', zIndex: 2 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}
            >
              Welcome to <ColourfulText text="Supreme Temple Jewellery" />
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 4, color: '#ddd' }}>
              Specialists in{' '}
              <ColourfulText text="Dance Costumes & Jewelry Since 1967" />
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 4,
                background: 'linear-gradient(90deg, #061f59, #122b76)', // Deep Blue Gradient
                color: '#fff',
                borderRadius: '30px',
                padding: '10px 30px',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(90deg, #122b76, #061f59)', // Reversed Gradient on Hover
                },
              }}
              onClick={() => navigate('/products')}
            >
              Shop Now
            </Button>

            {/* If you truly need two "Shop Now" buttons, you can keep this second one.
                Otherwise, feel free to remove it. */}
            <Button
              variant="contained"
              sx={{
                mt: 4,
                ml: 2, // small left margin so it's not stacked on the first button
                background: 'linear-gradient(90deg, #061f59, #122b76)',
                color: '#fff',
                borderRadius: '30px',
                padding: '10px 30px',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(90deg, #122b76, #061f59)',
                },
              }}
              onClick={() => navigate('/products')}
            >
              Shop Now
            </Button>
          </Box>

          {/* --- Transparent Search Bar at the bottom of hero --- */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              bottom: '40px',
              width: '90%',
              maxWidth: '800px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              padding: '5px',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <TextField
              placeholder="Search Bharathanatyam jewellery..."
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#061f59' }} />
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: 'transparent',
                  borderRadius: '50px',
                  fontSize: '16px',
                  color: '#333',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  border: 'none',
                  paddingLeft: '15px',
                },
                '& .MuiInputAdornment-root': {
                  marginRight: '10px',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #061f59, #122b76)',
                color: 'white',
                borderRadius: '50px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                padding: '10px 25px',
                marginLeft: '10px',
                '&:hover': {
                  background: 'linear-gradient(90deg, #122b76, #061f59)',
                },
              }}
              onClick={() => {
                // Implement search functionality or navigation
                alert('Search functionality to be implemented.');
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* --- Coming Soon Section --- */}
        <ComingSoon />

        {/* --- Quick Selection (Categories) --- */}
        <Container sx={{ mt: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Quick Selection
          </Typography>
          <Slider {...sliderSettings}>
            {categories.map((category, index) => (
              <Box key={index} sx={{ p: 1 }}>
                <Card
                  sx={{
                    ':hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    },
                    borderRadius: '15px',
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.name}
                    height="200"
                  />
                  <CardContent>
                    <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
                      {category.name}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        background: '#fa8302', // Earthy Orange
                        color: '#fff',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        '&:hover': {
                          background: '#e67300',
                        },
                      }}
                      onClick={() => handleCategoryClick(category.link)}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Container>

        {/* --- Custom Orange Section (Call to Action) --- */}
        <Box
          sx={{
            backgroundColor: '#fa8302', // Earthy Orange
            color: '#fff',
            mt: 6,
            py: 5,
          }}
        >
          <Container>
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Customise your dance costume and jewellery
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Talk to our expert and get your dance costume and accessories
                  tailored exactly to your style and measurements.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(90deg, #061f59, #122b76)',
                    color: 'white',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    padding: '10px 25px',
                    borderRadius: '30px',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #122b76, #061f59)',
                    },
                  }}
                  onClick={() => navigate('/contact')}
                >
                  Book Now
                </Button>
              </Grid>

              {/* Right side: Local video from /public/videos/my-custom-video.mp4 */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{ textAlign: 'center', mt: { xs: 4, md: 3 } }}
              >
                <video
                  width="100%"
                  height="400"
                  style={{ borderRadius: '8px' }}
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src="/videos/my-custom-video.mp4" type="video/mp4" />
                  {/* Fallback text for older browsers */}
                  {/* Use braces to avoid unescaped entity warning */}
                  {'Your browser does not support the HTML5 video element.'}
                </video>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* --- Featured Products --- */}
        <Container sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Featured Products
          </Typography>
          <Grid container spacing={3}>
            {featuredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    transition: 'transform 0.3s ease',
                    ':hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    },
                    borderRadius: '15px',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    height="200"
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
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
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* --- Latest Blogs --- */}
        <Container sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Latest Blogs
          </Typography>
          <Grid container spacing={4}>
            {/* Left side: Large featured blog */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease',
                  ':hover': { boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' },
                  borderRadius: '15px',
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
                      color: '#fa8302', // Earthy Orange
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Right side: Smaller blog cards */}
            <Grid item xs={12} md={6}>
              {blogs.map((blog, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease',
                    ':hover': { boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' },
                    borderRadius: '15px',
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
                        <Typography variant="subtitle2" color="text.secondary">
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
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Home;
