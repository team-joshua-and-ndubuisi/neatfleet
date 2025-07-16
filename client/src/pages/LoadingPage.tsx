import React from 'react';
import { Spinner } from '@/components';

const LoadingPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
      <Spinner size='lg' className='text-primary' />
      <p className='mt-4 text-muted-foreground'>Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
