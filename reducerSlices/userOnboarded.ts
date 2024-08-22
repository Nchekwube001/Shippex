import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface OnboardedState {
  onboarded: boolean;
}
const initialState: OnboardedState = {
  onboarded: false,
};

export const onboardSlice = createSlice({
  name: 'onboardCheck',
  initialState,
  reducers: {
    setAlreadyOnboarded: (
      state: OnboardedState,
      {payload}: PayloadAction<OnboardedState>,
    ) => {
      state.onboarded = payload.onboarded;
    },
  },
});

export const {setAlreadyOnboarded} = onboardSlice.actions;
export default onboardSlice.reducer;
