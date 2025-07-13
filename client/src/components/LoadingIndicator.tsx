import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading...',
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <CircularProgress size={24} />
      <Typography variant='body2' color='text.secondary'>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;
