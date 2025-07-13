import React from 'react';
import { Typography, Container } from '@mui/material';
import { texts } from '~/data';

const AboutPage: React.FC = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant='h4' mb={2}>
        About this template...
      </Typography>
      <Typography variant='body1'>{texts.about}</Typography>
    </Container>
  );
};

export default AboutPage;
