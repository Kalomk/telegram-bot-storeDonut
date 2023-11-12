import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { activeCountry: number } = {
  activeCountry: 0,
};

const activeCountryFilterSlice = createSlice({
  name: 'activeCountry',
  initialState,
  reducers: {
    changeActiveCountry: (state, action: PayloadAction<number>) => {
      state.activeCountry = action.payload;
    },
  },
});

const { actions, reducer } = activeCountryFilterSlice;
export default reducer;
export const { changeActiveCountry } = actions;
