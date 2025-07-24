import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ScheduleServicePage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Schedule Service Page</h4>
      <p>id: {id}</p>
      <Link to='payment'>Proceed to payment</Link>
    </div>
  );
};

export default ScheduleServicePage;
