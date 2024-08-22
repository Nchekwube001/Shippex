import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface bankState {
  bankList: any[];
}
const initialState: bankState = {
  bankList: [],
};

export const bankSLixce = createSlice({
  name: 'banksList',
  initialState,
  reducers: {
    setBankList: (state: bankState, {payload}: PayloadAction<bankState>) => {
      state.bankList = payload.bankList;
    },
  },
});

export const {setBankList} = bankSLixce.actions;
export default bankSLixce.reducer;
