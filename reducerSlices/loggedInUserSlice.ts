import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
  email: string;
}

const initialState: LoginState = {
  email: '',
};

const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setLoggedInUser(state, {payload}: PayloadAction<LoginState>) {
      state.email = payload.email;
    },
  },
});

export const {setLoggedInUser} = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
