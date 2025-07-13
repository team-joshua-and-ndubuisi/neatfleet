import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '~/components';
import { navItems } from '~/data';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <NavBar heading='Web App Template' navItems={navItems} />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
