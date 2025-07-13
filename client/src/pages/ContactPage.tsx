import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { UserList } from '~/features/users';

const ContactPage: React.FC = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <Stack direction='column'>
        <Typography variant='h4'>Users</Typography>
        <UserList />
      </Stack>
    </Container>
  );
};

export default ContactPage;
