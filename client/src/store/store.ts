import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';

const store = configureStore({
  reducer: reducers,
});

// Export store and types for use with TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
