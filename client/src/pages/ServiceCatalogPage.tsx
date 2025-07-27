import React from 'react';
import { BookServiceForm } from '@/features/bookService';

const ServiceCatalogPage: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Service Catalog Page</h4>
      <BookServiceForm />
    </div>
  );
};

export default ServiceCatalogPage;
