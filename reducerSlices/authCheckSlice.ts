import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from '../constants/types/types';

const initialState: AuthState = {
  alreadyAuth: false,
};

export const authSlice = createSlice({
  name: 'authCheck',
  initialState,
  reducers: {
    setAlreadyAuth: (state: AuthState, {payload}: PayloadAction<AuthState>) => {
      state.alreadyAuth = payload.alreadyAuth;
    },
  },
});

export const {setAlreadyAuth} = authSlice.actions;
export default authSlice.reducer;
