import React from 'react';
import { Link } from 'react-router-dom';

const servicesData = [
  'Vacuuming',
  'Painting',
  'Lawn mowing',
  'Clogged sink',
  'Roof repair',
];

interface ServiceSelectionProps {
  service: string;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ service }) => {
  return (
    <div className='bg-blue-400 text-white p-4 rounded-md flex items-center justify-center text-center'>
      {service}
    </div>
  );
};

const ServiceCatalogPage: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Service Catalog Page</h4>
      <div className='grid grid-cols-3 grid-rows-2 gap-4 max-w-4xl'>
        {servicesData.map((service) => (
          <ServiceSelection key={service} service={service} />
        ))}
      </div>
      <Link to='book-technician'>Next step: choose a technician</Link>
    </div>
  );
};

export default ServiceCatalogPage;
