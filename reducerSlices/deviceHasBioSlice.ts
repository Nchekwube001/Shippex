import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface deviceHasBioState {
  deviceHasBio: boolean;
}
const initialState: deviceHasBioState = {
  deviceHasBio: false,
};

export const deviceHasBioSlice = createSlice({
  name: 'deviceHasBio',
  initialState,
  reducers: {
    setDeviceHasBio: (
      state: deviceHasBioState,
      {payload}: PayloadAction<deviceHasBioState>,
    ) => {
      state.deviceHasBio = payload.deviceHasBio;
    },
  },
});

export const {setDeviceHasBio} = deviceHasBioSlice.actions;
export default deviceHasBioSlice.reducer;
