import { combineReducers } from '@reduxjs/toolkit';

import ingredients from './slices/ingredientsSlice';

import user from './slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredients,
  user: user,
  // constructor: ,
  // order: ,
});

export default rootReducer;