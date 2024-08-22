import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
  loggedIn: boolean;
  access_token: string;
  refresh_token: string | undefined;
}

const initialState: LoginState = {
  loggedIn: false,
  access_token: '',
  refresh_token: '',
};
interface loginPayload {
  loggedIn: boolean;
}
interface tokenPayload {
  access_token: string;
  refresh_token?: string;
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginStatus(state, {payload}: PayloadAction<loginPayload>) {
      state.loggedIn = payload.loggedIn;
    },
    setAcessToken(state, {payload}: PayloadAction<tokenPayload>) {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
    },
    removeAccessToken() {
      return initialState;
    },
  },
});

export const {setLoginStatus, setAcessToken, removeAccessToken} =
  loginSlice.actions;
export default loginSlice.reducer;
