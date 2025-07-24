import React from 'react';
import { UserType } from '@/features/users';
import { cn } from '@/lib/utils';

interface UserProps {
  user: UserType;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <li className='flex items-center px-4 py-2'>
      <p className='text-base text-foreground'>
        {user.first_name} -{' '}
        <a
          href={`mailto:${user.email}`}
          className={cn(
            'text-blue-500 visited:text-blue-500 underline-offset-4 hover:underline',
            'transition-colors cursor-pointer'
          )}
        >
          {user.email}
        </a>
      </p>
    </li>
  );
};

export default User;
