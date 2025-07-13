import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress />
      <Typography variant='body1' sx={{ mt: 2 }} color='text.secondary'>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
