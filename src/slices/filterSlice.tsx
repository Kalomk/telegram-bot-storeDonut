import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: { activeFilter: number } = {
  activeFilter: 0,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeProductFilter: (state, action: PayloadAction<number>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const filteredProducts = createSelector(
  (state: RootState) => state.products.entities,
  (state: RootState) => state.filters.activeFilter,
  (products, filter) => {
    if (filter > 0) {
      return products.filter((item) => item.category === filter);
    } else {
      return products;
    }
  }
);

const { actions, reducer } = filtersSlice;
export default reducer;
export const { changeProductFilter } = actions;
