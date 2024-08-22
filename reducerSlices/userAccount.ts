import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface accountState {
  userAccount: {
    accountname: string;
    accountnumber: string;
    accreference: string;
    freezeacc: string;
  };
}
const initialState: accountState = {
  userAccount: {
    accountname: '',
    accountnumber: '',
    accreference: '',
    freezeacc: '',
  },
};

export const userAccountSlice = createSlice({
  name: 'userAcct',
  initialState,
  reducers: {
    setUserAccount: (
      state: accountState,
      {payload}: PayloadAction<accountState>,
    ) => {
      state.userAccount = payload.userAccount;
    },
    clearUserAccount() {
      return {
        ...initialState,
      };
    },
  },
});

export const {setUserAccount, clearUserAccount} = userAccountSlice.actions;
export default userAccountSlice.reducer;
