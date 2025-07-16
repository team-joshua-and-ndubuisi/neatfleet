import React from 'react';
import { texts } from '@/data';

const AboutPage: React.FC = () => {
  return (
    <div className='mt-16 px-8'>
      <h4 className='text-3xl mb-4'>About this template...</h4>
      <p>{texts.about}</p>
    </div>
  );
};

export default AboutPage;
