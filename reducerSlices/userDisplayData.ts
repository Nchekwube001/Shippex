import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface displayState {
  createdAt: string;
  defaultCurrency: string;
  defaultPointWallet: any[];
  email: string;
  emailOtp: null | string;
  emailOtpTimeInit: null | string;
  emailVerified: boolean;
  id: number;
  kycCompleted: boolean;
  mainMerchantId: null | string;
  name: string;
  phone: string;
  phoneOtp: string;
  phoneOtpTimeInit: null | string;
  phoneVerified: boolean;
  pid: string;
  profileImg: null | string;
  // profileType: 'USER';
  profileType: string;
  pwOtpTimeInit: null | string;
  pwOtpVerified: null | string;
  pwResetOtp: null | string;
  updatedAt: string;
}
const initialState: displayState | any = {
  createdAt: '',
  defaultCurrency: '',
  defaultPointWallet: [],
  email: '',
  emailOtp: '',
  emailOtpTimeInit: '',
  emailVerified: false,
  id: 0,
  kycCompleted: false,
  mainMerchantId: '',
  name: '',
  phone: '',
  phoneOtp: '',
  phoneOtpTimeInit: '',
  phoneVerified: false,
  pid: '',
  profileImg: null,
  profileType: '',
  pwOtpTimeInit: '',
  pwOtpVerified: '',
  pwResetOtp: '',
  updatedAt: '',
};

export const userDisplaySlice = createSlice({
  name: 'displayData',
  initialState,
  reducers: {
    setUserDisplayData: (
      state: displayState,
      {payload}: PayloadAction<Partial<displayState>>,
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
    clearUserDisplayData() {
      return {
        ...initialState,
      };
    },
  },
});

export const {setUserDisplayData, clearUserDisplayData} =
  userDisplaySlice.actions;
export default userDisplaySlice.reducer;
