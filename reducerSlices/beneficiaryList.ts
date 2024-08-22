import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface benState {
  beneficiaries: any[];
}
const initialState: benState = {
  beneficiaries: [],
};

export const beneficiarySlice = createSlice({
  name: 'beneficiaries',
  initialState,
  reducers: {
    setBeneficiaries: (state: benState, {payload}: PayloadAction<benState>) => {
      state.beneficiaries = payload.beneficiaries;
    },
    clearBeneficiaries: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {setBeneficiaries, clearBeneficiaries} = beneficiarySlice.actions;
export default beneficiarySlice.reducer;
