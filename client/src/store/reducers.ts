import { combineReducers } from '@reduxjs/toolkit';
import { counterSlice } from '~/features/counter';

export const reducers = combineReducers({
  counterSlice: counterSlice,
});
