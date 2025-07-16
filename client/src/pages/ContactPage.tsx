import React from 'react';
import { UserList } from '@/features/users';

const ContactPage: React.FC = () => {
  return (
    <div className='container mx-auto px-4 mt-8'>
      <div className='flex flex-col space-y-4'>
        <h1 className='text-3xl tracking-tight'>Users</h1>
        <UserList />
      </div>
    </div>
  );
};

export default ContactPage;
