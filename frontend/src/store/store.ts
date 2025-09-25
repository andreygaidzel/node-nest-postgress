import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import { postAPI } from '../services/PostService';

export const setupStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      [postAPI.reducerPath]: postAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
