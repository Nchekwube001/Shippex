import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface balanceState {
  balance: number;
  sentTransactions: any[];
  receivedTransactions: any[];
}
const initialState: balanceState = {
  balance: 0,
  receivedTransactions: [],
  sentTransactions: [],
};

export const userBalanceSlice = createSlice({
  name: 'userBalance',
  initialState,
  reducers: {
    setUserBalance: (
      state: balanceState,
      {payload}: PayloadAction<balanceState>,
    ) => {
      return {
        ...payload,
      };
    },
    clearUserBalance() {
      return {
        ...initialState,
      };
    },
  },
});

export const {setUserBalance, clearUserBalance} = userBalanceSlice.actions;
export default userBalanceSlice.reducer;
