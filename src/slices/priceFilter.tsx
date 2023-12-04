import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const activePrice = localStorage.getItem('activePrice') as 'zł' | '€';

const initialState: { activePrice: 'zł' | '€' } = {
  activePrice: activePrice ? activePrice : 'zł',
};

const activePriceFilterSlice = createSlice({
  name: 'activePrice',
  initialState,
  reducers: {
    changeActivePrice: (state, action: PayloadAction<'zł' | '€'>) => {
      state.activePrice = action.payload;
      localStorage.setItem('activePrice', state.activePrice);
    },
  },
});

export const filteredPrice = createSelector(
  (state: RootState) => state.products.entities,
  (state: RootState) => state.activePrice.activePrice,
  (products, activePrice) => {
    return products.map((item) => item.price[activePrice]);
  }
);

const { actions, reducer } = activePriceFilterSlice;
export default reducer;
export const { changeActivePrice } = actions;
