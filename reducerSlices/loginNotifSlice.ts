import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface useLoginNotifState {
  useLoginNotif: boolean;
}
const initialState: useLoginNotifState = {
  useLoginNotif: false,
};

export const useLoginNotifSlice = createSlice({
  name: 'useLoginNotif',
  initialState,
  reducers: {
    setUseLoginNotif: (
      state: useLoginNotifState,
      {payload}: PayloadAction<useLoginNotifState>,
    ) => {
      state.useLoginNotif = payload.useLoginNotif;
    },
  },
});

export const {setUseLoginNotif} = useLoginNotifSlice.actions;
export default useLoginNotifSlice.reducer;
