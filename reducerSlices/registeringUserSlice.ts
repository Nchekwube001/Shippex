import {genderType} from '@/constants/utils/constants';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface RegisteringUserState {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  dob: string;
  gender: genderType;
  username: string;
}

const initialState: RegisteringUserState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phoneNumber: '',
  username: '',
  gender: '',
  dob: '',
};

const registeringUserSlice = createSlice({
  name: 'registeringUser',
  initialState,
  reducers: {
    setRegisteringUser(
      state,
      {payload}: PayloadAction<Partial<RegisteringUserState>>,
    ) {
      return {
        ...state,
        ...payload,
      };
    },
    clearRegisteringUser() {
      return {
        ...initialState,
      };
    },
  },
});

export const {setRegisteringUser, clearRegisteringUser} =
  registeringUserSlice.actions;
export default registeringUserSlice.reducer;
