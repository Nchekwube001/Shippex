import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BioState {
  useLoginBio: boolean;
}

const initialState: BioState = {
  useLoginBio: false,
};

export const loginBioSlice = createSlice({
  name: 'loginBioSlice',
  initialState,
  reducers: {
    setUseLoginBio: (state: BioState, {payload}: PayloadAction<BioState>) => {
      state.useLoginBio = payload.useLoginBio;
    },
  },
});

export const {setUseLoginBio} = loginBioSlice.actions;
export default loginBioSlice.reducer;
