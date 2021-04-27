import { combineReducers } from '@reduxjs/toolkit';
import user from './user/user.reducer';
import app from './app/app.reducer';

export default combineReducers({
  app,
  user
})