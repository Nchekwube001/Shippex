import {combineReducers, configureStore} from '@reduxjs/toolkit';
import toastSlice from '../reducerSlices/toastSlice';
import authCheckSlice from '../reducerSlices/authCheckSlice';
import onboardSlice from '../reducerSlices/userOnboarded';
import loginSlice from '../reducerSlices/loginSlice';
import loggedInUserSlice from '../reducerSlices/loggedInUserSlice';

const reducers = combineReducers({
  apiStatus: toastSlice,
  authChecker: authCheckSlice,
  userOnboarded: onboardSlice,
  isLoggedIn: loginSlice,
  loggedInUser: loggedInUserSlice,
});

export const store = configureStore({
  reducer: reducers,
  middleware: defaultMiddleWare =>
    defaultMiddleWare({
      serializableCheck: false,
    }).concat(),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
