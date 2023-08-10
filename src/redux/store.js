// store.js
import { configureStore } from '@reduxjs/toolkit';
import pieChartReducer from './pieChartSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    pieChart: pieChartReducer,
    user: userReducer,

  },
});

export default store;