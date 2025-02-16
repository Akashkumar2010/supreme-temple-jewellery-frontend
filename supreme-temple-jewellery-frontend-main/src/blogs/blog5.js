import React from 'react';
import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

function Blog1() {
  return (
    <Container sx={{ mt: 4 }}>
      <Helmet>
        <title>
          Bharatanatyam Costume: Unveiling the Rituals and Traditions
        </title>
        <meta
          name="description"
          content="Explore the elegance of Bharatanatyam costumes and jewelry. Learn about the rich traditions and cultural significance of this classical dance."
        />
        <meta
          name="keywords"
          content="Bharatanatyam, dance costume, Indian classical dance, temple jewelry"
        />
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Bharatanatyam Costume: Unveiling the Rituals and Traditions
      </Typography>
      <img
        src="https://your-image-link.jpg"
        alt="Bharatanatyam Costume"
        style={{ width: '100%', marginBottom: '20px' }}
      />
      <Typography variant="body1" paragraph>
        Bharatanatyam, a classical dance form from Tamil Nadu, is known for its
        intricate movements, expressions, and costumes. The traditional costume
        is designed to highlight the grace and storytelling aspect of the dance.
        Temple jewelry, such as necklaces, bangles, and earrings, plays a vital
        role in enhancing the beauty of the performance.
      </Typography>
      <Typography variant="body1" paragraph>
        The costume consists of vibrant silk sarees, pleated to allow ease of
        movement. Each piece of jewelry, handcrafted with precision, reflects
        the devotion and artistry of Bharatanatyam.
      </Typography>
      <Typography variant="body1" paragraph>
        Explore our collection of Bharatanatyam costumes and jewelry to connect
        with this timeless tradition.
      </Typography>
    </Container>
  );
}

export default Blog1;
