// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUser(state) {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
