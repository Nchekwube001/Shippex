import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface benUtilState {
  beneficiaries: any[];
}
const initialState: benUtilState = {
  beneficiaries: [],
};

export const beneficiaryUtilSlice = createSlice({
  name: 'beneficiariesUtils',
  initialState,
  reducers: {
    setBeneficiariesUtil: (
      state: benUtilState,
      {payload}: PayloadAction<benUtilState>,
    ) => {
      state.beneficiaries = payload.beneficiaries;
    },
    clearBeneficiariesUtil: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {setBeneficiariesUtil, clearBeneficiariesUtil} =
  beneficiaryUtilSlice.actions;
export default beneficiaryUtilSlice.reducer;
