import { useCounterStore } from '../stores';

export const useCounter = () => {
  const { value, increment, decrement, incrementByAmount } = useCounterStore();

  return {
    counterValue: value,
    incrementCount: increment,
    decrementCount: decrement,
    incrementCountBy: incrementByAmount,
  };
};
