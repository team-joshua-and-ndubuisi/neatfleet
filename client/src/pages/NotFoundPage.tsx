import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackBtnClick = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography
        variant='h1'
        component='h1'
        color='error'
        sx={{ fontWeight: 'bold' }}
      >
        404
      </Typography>
      <Typography variant='h5' color='text.secondary' sx={{ mt: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant='contained' sx={{ mt: 4 }} onClick={handleBackBtnClick}>
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
