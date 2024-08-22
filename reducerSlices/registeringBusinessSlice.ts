import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface RegisteringBusinessState {
  email: string;
  name: string;
  phone: string;
  password: string;
  address: string;
  category: string;
  zipCode: string;
  city: string;
  country: string;
  state: string;
}

const initialState: RegisteringBusinessState = {
  email: '',
  password: '',
  address: '',
  category: '',
  city: '',
  country: '',
  name: '',
  phone: '',
  state: '',
  zipCode: '',
};

const registeringBusinessSlice = createSlice({
  name: 'registeringBusiness',
  initialState,
  reducers: {
    setRegisteringBusiness(
      state,
      {payload}: PayloadAction<Partial<RegisteringBusinessState>>,
    ) {
      return {
        ...state,
        ...payload,
      };
    },
    clearRegisteringBusiness() {
      return {
        ...initialState,
      };
    },
  },
});

export const {setRegisteringBusiness, clearRegisteringBusiness} =
  registeringBusinessSlice.actions;
export default registeringBusinessSlice.reducer;
