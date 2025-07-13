import { useAppSelector, useAppDispatch } from '~/store';
import { increment, decrement, incrementByAmount } from '../slices';

export const useCounter = () => {
  const appDispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counterSlice.value);
  const incrementCount = () => appDispatch(increment());
  const decrementCount = () => appDispatch(decrement());
  const incrementCountBy = (value: number) =>
    appDispatch(incrementByAmount(value));

  return {
    counterValue,
    incrementCount,
    decrementCount,
    incrementCountBy,
  };
};
