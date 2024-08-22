import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface showBalanceState {
  showBalance: boolean;
}
const initialState: showBalanceState = {
  showBalance: true,
};

export const showBalanceSlice = createSlice({
  name: 'showBalance',
  initialState,
  reducers: {
    setShowBalance: (
      state: showBalanceState,
      {payload}: PayloadAction<showBalanceState>,
    ) => {
      state.showBalance = payload.showBalance;
    },
    resetBalance: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {setShowBalance, resetBalance} = showBalanceSlice.actions;
export default showBalanceSlice.reducer;
