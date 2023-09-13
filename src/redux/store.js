import { configureStore } from '@reduxjs/toolkit';
import statesReducer from './states/statesSlice';
import citiesReducer from './cities/citiesSlice';
import cityReducer from './city/citySlice';

const store = configureStore({
  reducer: {
    states: statesReducer,
    cities: citiesReducer,
    city: cityReducer,
  },
});

export default store;
