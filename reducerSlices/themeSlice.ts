import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setDarkMode: (state: ThemeState, {payload}: PayloadAction<ThemeState>) => {
      state.darkMode = payload.darkMode;
    },
  },
});

export const {setDarkMode} = themeSlice.actions;
export default themeSlice.reducer;
