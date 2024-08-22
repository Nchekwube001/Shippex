import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import toastSlice from '../reducerSlices/toastSlice';
import authCheckSlice from '../reducerSlices/authCheckSlice';
import onboardSlice from '../reducerSlices/userOnboarded';
import loginSlice from '../reducerSlices/loginSlice';
import loggedInUserSlice from '../reducerSlices/loggedInUserSlice';

const mainPersistConfig = {
  key: 'mainPersist',
  storage: AsyncStorage,
  blacklist: ['isLoggedIn'],
};
const reducers = combineReducers({
  apiStatus: toastSlice,
  authChecker: authCheckSlice,
  userOnboarded: onboardSlice,
  isLoggedIn: loginSlice,
  loggedInUser: loggedInUserSlice,
});

const persistedReducer = persistReducer(mainPersistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleWare =>
    defaultMiddleWare({
      serializableCheck: false,
    }).concat(),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
