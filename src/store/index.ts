import reducer from './reducers'
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";


const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware()]
});

export default store;

export type StoreState = ReturnType<typeof reducer>