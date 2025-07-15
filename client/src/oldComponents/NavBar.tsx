import React from 'react';
import {
  AppBar,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { NavItemType } from '~/types';

interface NavBarProps {
  heading?: string;
  navItems: NavItemType[];
}

const NavBar: React.FC<NavBarProps> = ({ heading, navItems }) => {
  return (
    <AppBar position='static' component='nav'>
      <Stack
        direction='row'
        sx={{ justifyContent: 'space-between', alignItems: 'center', mx: 4 }}
      >
        <Typography variant='h4'>{heading}</Typography>
        <List sx={{ display: 'inline-flex' }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </AppBar>
  );
};

export default NavBar;
