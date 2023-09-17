import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalShot: 100,
  successShot: 50,
  unSuccessShot: 50,
  savedData: null, 
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
    saveData: (state, action) => {
        const { successShot, unSuccessShot, totalShot } = state;
        
        state.savedData = {
          successShot,
          unSuccessShot,
          totalShot,
        };
      },
      
  },
});

export const { setPieChartData, saveData } = pieChartSlice.actions;
export default pieChartSlice.reducer;
