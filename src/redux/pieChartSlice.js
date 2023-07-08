import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalShot: 200,
  successShot: 100,
  unSuccessShot: 100,
  
};

const pieChartSlice = createSlice({
  name: 'pieChart',
  initialState,
  reducers: {
    setPieChartData: (state, action) => {
      const { successShot, unSuccessShot } = action.payload;

      const totalShot = successShot + unSuccessShot;
      

      state.totalShot = totalShot;
      state.successShot = successShot;
      state.unSuccessShot = unSuccessShot;
      
    },
  },
});

export const { setPieChartData } = pieChartSlice.actions;
export default pieChartSlice;
