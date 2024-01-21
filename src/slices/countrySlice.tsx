import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const activeCoutryFromLS = localStorage.getItem('activeCountry');
const rightCountryGroup = activeCoutryFromLS ? activeCoutryFromLS : '0';


const initialState: { activeCountry: string } = {
  activeCountry: rightCountryGroup,
};

const activeCountryFilterSlice = createSlice({
  name: 'activeCountry',
  initialState,
  reducers: {
    changeActiveCountry: (state, action: PayloadAction<string>) => {
      state.activeCountry = action.payload;
    },
  },
});

const { actions, reducer } = activeCountryFilterSlice;
export default reducer;
export const { changeActiveCountry } = actions;
