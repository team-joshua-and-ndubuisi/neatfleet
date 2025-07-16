import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components';
import { NavItemType } from '@/types';
import { cn } from '@/lib/utils';

interface NavBarProps {
  heading?: string;
  navItems: NavItemType[];
}

const NavBar: React.FC<NavBarProps> = ({ heading, navItems }) => {
  return (
    <nav className='bg-blue-500 text-primary-foreground shadow-md'>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1 className='text-4xl'>{heading}</h1>
        <ul className='flex space-x-2'>
          {navItems.map((item) => (
            <li key={item.text}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'inline-block',
                    isActive ? 'bg-primary-foreground/20 rounded-md' : ''
                  )
                }
              >
                <Button
                  variant='ghost'
                  className={cn(
                    'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
                    'transition-colors duration-200 text-lg text-center'
                  )}
                >
                  {item.text}
                </Button>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
