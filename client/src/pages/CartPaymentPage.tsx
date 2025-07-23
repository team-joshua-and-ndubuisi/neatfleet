import React from 'react';
import { useParams } from 'react-router-dom';

const CartPaymentPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>Cart and Payment Page</h4>
      <p>id: {id}</p>
    </div>
  );
};

export default CartPaymentPage;
