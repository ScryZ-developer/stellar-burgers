import { combineReducers } from '@reduxjs/toolkit';

import ingredients from './slices/ingredientsSlice';

const rootReducer = combineReducers({
  ingridients: ingredients
  // user: ,
  // constructor: ,
  // order: ,
});

export default rootReducer;