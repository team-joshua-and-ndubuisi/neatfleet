import React from 'react';
import { Container, Stack, IconButton, Typography } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { useCounter } from '~/features/counter';

const HomePage: React.FC = () => {
  const { counterValue, incrementCount, decrementCount } = useCounter();

  return (
    <Container>
      <Typography variant='h6' align='center' sx={{ mt: 8 }}>
        What would a React demo be without the obligatory...
      </Typography>
      <Typography variant='h2' align='center'>
        Counter Component
      </Typography>
      <Stack
        direction='column'
        sx={{
          mt: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h3' component='p' sx={{ display: 'inline' }}>
          {counterValue}
        </Typography>
        <Stack direction='row'>
          <IconButton onClick={decrementCount} size='large' color='minus'>
            <RemoveCircle />
          </IconButton>
          <IconButton onClick={incrementCount} size='large' color='plus'>
            <AddCircle />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HomePage;
