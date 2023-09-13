import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action) => action.payload,
  },
});

export const { setCity } = citySlice.actions;

export default citySlice.reducer;
