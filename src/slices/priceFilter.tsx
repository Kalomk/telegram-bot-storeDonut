import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: { activePrice: 'zł' | 'eu' } = {
  activePrice: 'zł',
};

const activePriceFilterSlice = createSlice({
  name: 'activePrice',
  initialState,
  reducers: {
    changeActivePrice: (state, action: PayloadAction<'zł' | 'eu'>) => {
      state.activePrice = action.payload;
    },
  },
});

export const filteredPrice = createSelector(
  (state: RootState) => state.products,
  (state: RootState) => state.activePrice.activePrice,
  (products, activePrice) => {
    return products.map((item) => item.price[activePrice]);
  }
);

const { actions, reducer } = activePriceFilterSlice;
export default reducer;
export const { changeActivePrice } = actions;
