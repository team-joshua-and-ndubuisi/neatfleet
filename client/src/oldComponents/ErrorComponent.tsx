import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = 'Something went wrong while fetching data.',
  onRetry,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center',
        backgroundColor: 'background.default',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <ErrorOutline color='error' sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant='h6' color='text.secondary'>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
          onClick={onRetry}
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorComponent;
