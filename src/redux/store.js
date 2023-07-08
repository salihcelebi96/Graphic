// store.js
import { configureStore } from '@reduxjs/toolkit';
import pieChartSlice from './pieChartSlice';

const store = configureStore({
  reducer: {
    pieChart: pieChartSlice.reducer,
  },
});

export default store;