import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface kycUserState {
  idType: string;
  issueCountry: string;
  docFront: any;
  docBack: any;
  selfie: any;
}

const initialState: kycUserState = {
  docBack: {},
  docFront: {},
  idType: '',
  issueCountry: '',
  selfie: {},
};

const kycUserSlice = createSlice({
  name: 'KycUser',
  initialState,
  reducers: {
    setKycUser(state, {payload}: PayloadAction<Partial<kycUserState>>) {
      return {
        ...state,
        ...payload,
      };
    },
    clearKycUser() {
      return {
        ...initialState,
      };
    },
  },
});

export const {setKycUser, clearKycUser} = kycUserSlice.actions;
export default kycUserSlice.reducer;
