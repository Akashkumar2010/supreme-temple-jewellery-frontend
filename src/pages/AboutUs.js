// frontend/src/pages/AboutUs.js
import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

function AboutUs() {
  return (
    <div
      style={{
        backgroundImage: 'url("/moroccan-flower.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensures it spans the full height of the screen
        padding: '3rem',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Adds a slight white background to the content
          padding: '3rem',
          borderRadius: '8px', // Optional: Rounds the edges of the content box
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a shadow for better readability
        }}
      >
        {/* Title Section */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          About Us
        </Typography>
        <Divider
          sx={{
            mb: 4,
            bgcolor: '#3a7bd5',
            height: '3px',
            width: '10%',
            margin: '0 auto',
          }}
        />

        {/* Content Section */}
        <Box sx={{ textAlign: 'justify', lineHeight: 1.8, color: '#555' }}>
          <Typography variant="body1" paragraph>
            Founded in 1987, Supreme Temple Jewellery has been a beacon of
            tradition and artistry in the world of Bharatanatyam. Located in the
            cultural hub of Vadasery, Nagercoil, in Tamil Nadu’s Kanyakumari
            district, we specialize in crafting authentic, handcrafted jewelry
            that celebrates the rich heritage of India’s classical dance form,
            Bharatanatyam.
          </Typography>

          <Typography variant="body1" paragraph>
            Inspired by our love for Bharatanatyam, the national dance of India,
            our mission is to provide dancers and cultural enthusiasts with
            jewelry that enhances their performances while staying true to
            tradition. Each piece is a testament to our commitment to preserving
            the elegance and beauty of this iconic art form.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 3 }}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At Supreme Temple Jewellery, our mission is to create timeless
            pieces that embody the spirit of Bharatanatyam. We strive to provide
            dancers with high-quality, handcrafted jewelry that complements
            their artistry and ensures their performances shine with grace and
            tradition.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 3 }}
          >
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            We aim to become the most trusted brand for Bharatanatyam dancers
            globally by offering exquisite, durable, and affordable temple
            jewelry. Our focus is on quality, authenticity, and customer
            satisfaction.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 3 }}
          >
            Craftsmanship and Quality
          </Typography>
          <Typography variant="body1" paragraph>
            Every product is meticulously handcrafted by skilled artisans who
            use silver as the base metal, coat it with gold, and embellish it
            with stones and gold papers. Each piece is created with precision
            and care, ensuring it reflects the artistry and durability dancers
            expect.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 3 }}
          >
            Cultural Importance
          </Typography>
          <Typography variant="body1" paragraph>
            Bharatanatyam is more than just a dance—it is a divine offering and
            an artistic expression of devotion. Our jewelry plays a significant
            role in enhancing the storytelling, spirituality, and aesthetic
            appeal of this dance. Each piece is designed to complement the
            costumes and evoke the spiritual energy central to Bharatanatyam
            performances.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 3 }}
          >
            Our Team
          </Typography>
          <Typography variant="body1" paragraph>
            Behind Supreme Temple Jewellery is a dedicated team of 25 artisans
            and professionals, each contributing their passion and expertise to
            ensure every product meets the highest standards of craftsmanship
            and quality.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', mt: 3 }}
          >
            Walking Towards Excellence
          </Typography>
          <Typography variant="body1" paragraph>
            While we have yet to achieve formal accolades, our greatest
            achievement lies in the trust and love of our customers. Our
            milestone is to become a top brand in the temple jewelry industry,
            recognized for our authenticity, innovation, and excellence.
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 3 }}>
            At Supreme Temple Jewellery, we believe in celebrating the artistry
            of Bharatanatyam and providing products that honor its traditions.
            Thank you for being part of our journey in preserving and promoting
            this beautiful cultural legacy.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default AboutUs;
