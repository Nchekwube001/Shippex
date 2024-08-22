import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BioState {
  useTransBio: boolean;
}

const initialState: BioState = {
  useTransBio: false,
};

export const transBioSlice = createSlice({
  name: 'transBioSlice',
  initialState,
  reducers: {
    setUseTransBio: (state: BioState, {payload}: PayloadAction<BioState>) => {
      state.useTransBio = payload.useTransBio;
    },
  },
});

export const {setUseTransBio} = transBioSlice.actions;
export default transBioSlice.reducer;
