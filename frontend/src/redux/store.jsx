import { configureStore } from '@reduxjs/toolkit';
import farmReducer from './slice'; // default export from slice.jsx

// Create the Redux store
const store = configureStore({
  reducer: {
    farm: farmReducer,
  },
});

export default store;
