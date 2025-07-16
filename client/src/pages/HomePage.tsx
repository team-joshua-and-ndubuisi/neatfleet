import React from 'react';
import { useCounter } from '@/features/counter';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const HomePage: React.FC = () => {
  const { counterValue, incrementCount, decrementCount } = useCounter();

  return (
    <div>
      <h6 className='text-xl text-center mt-16'>
        What would a React demo be without the obligatory...
      </h6>
      <h2 className='text-6xl text-center'>Counter Component</h2>
      <div className='flex flex-col justify-center items-center mt-4'>
        <p className='inline text-5xl'>{counterValue}</p>
        <div className='flex flex-row gap-2'>
          <Button
            onClick={decrementCount}
            size='sm'
            className='bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 p-0'
          >
            <Minus className='size-6' />
          </Button>
          <Button
            onClick={incrementCount}
            size='sm'
            className='bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 p-0'
          >
            <Plus className='size-6' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
