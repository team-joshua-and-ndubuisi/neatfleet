import React from 'react';
import { Link } from 'react-router-dom';

const ClientProfile: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Client Profile Page</h4>
      <div className='flex gap-2'>
        <Link className='text-white bg-blue-400 p-4' to='rating'>
          View rating
        </Link>
        <Link className='text-white bg-blue-400 p-4' to='status'>
          Check status
        </Link>
      </div>
    </div>
  );
};

const TechnicianProfile: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Technician Profile Page</h4>
      <div className='flex gap-2'>
        <Link className='text-white bg-blue-400 p-4' to='manage-services'>
          Manage your services
        </Link>
        <Link className='text-white bg-blue-400 p-4' to='manage-availability'>
          Manage your availability
        </Link>
      </div>
    </div>
  );
};

const AdminProfile: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Admin Profile Page</h4>
      <div className='flex gap-2'>
        <Link className='text-white bg-blue-400 p-4' to='manage-services'>
          Manage Services
        </Link>
        <Link className='text-white bg-blue-400 p-4' to='manage-technicians'>
          Manage Technicians
        </Link>
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  // Imagine this some logic to figure out the type of user...
  type UserType = 'client' | 'technician' | 'admin';
  const user: UserType = 'admin' as UserType;

  if (user === 'technician') return <TechnicianProfile />;

  if (user === 'admin') return <AdminProfile />;

  return <ClientProfile />;
};

export default ProfilePage;
