// store.js
import { configureStore } from '@reduxjs/toolkit';
import pieChartReducer from './pieChartSlice';

const store = configureStore({
  reducer: {
    pieChart: pieChartReducer,
  },
});

export default store;