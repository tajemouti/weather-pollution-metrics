import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const statesSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    setStates: (state, action) => action.payload,
  },
});

export const { setStates } = statesSlice.actions;

export default statesSlice.reducer;
