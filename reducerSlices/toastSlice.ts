import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiNotifications} from '../constants/types/types';

const initialState: apiNotifications = {
  status: 0,
  message: '',
  icon: null,
};

export const apiToastSlice = createSlice({
  name: 'apiToast',
  initialState,
  reducers: {
    showToast(state, {payload}: PayloadAction<apiNotifications>) {
      state.status = payload.status;
      state.message = payload.message;
      state.icon = payload.icon;
    },
    hideToast() {
      return initialState;
    },
  },
});

export const {showToast, hideToast} = apiToastSlice.actions;
export default apiToastSlice.reducer;
