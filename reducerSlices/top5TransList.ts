import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface top5State {
  top5List: any[];
}
const initialState: top5State = {
  top5List: [],
};

export const topSlice = createSlice({
  name: 'topSlice',
  initialState,
  reducers: {
    setTop5List: (state: top5State, {payload}: PayloadAction<top5State>) => {
      state.top5List = payload.top5List;
    },
  },
});

export const {setTop5List} = topSlice.actions;
export default topSlice.reducer;
