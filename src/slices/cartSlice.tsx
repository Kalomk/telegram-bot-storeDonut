import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../utils/calcTotalPrice';
import { getCartFromLs } from '../utils/getCartFromLs';
import { calcTotalWeight } from '../utils/calTotalWeight';

export type CartItem = {
  title: string;
  imageUrl: string;
  price: number;
  weight: number;
  id: string | string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalWeight: number;
  cartItems: CartItem[];
}

const { cartItems, totalPrice, totalWeight } = getCartFromLs();
const initialState: CartSliceState = {
  cartItems: cartItems,
  totalPrice: +totalPrice,
  totalWeight: totalWeight,
};

const setItems = (cart: any, totalPrice: number, totalWeight: number) => {
  localStorage.setItem('cart', JSON.stringify(cart.map((item: CartItem) => item)));
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  localStorage.setItem('totalWeight', JSON.stringify(totalWeight));
};

const filtersSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = +calcTotalPrice(state.cartItems);
      state.totalWeight = calcTotalWeight(state.cartItems);
      setItems(state.cartItems, state.totalPrice, state.totalWeight);
      console.log(state.cartItems);
    },
    removeItems: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.totalPrice = +calcTotalPrice(state.cartItems);
      state.totalWeight = calcTotalWeight(state.cartItems);
      setItems(state.cartItems, state.totalPrice, state.totalWeight);
    },
    clearItems: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalWeight = 0;
      localStorage.setItem('cart', JSON.stringify(state.cartItems.map((item) => item)));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
      localStorage.setItem('totalWeight', JSON.stringify(state.totalWeight));
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
        setItems(state.cartItems, state.totalPrice, state.totalWeight);
      }
    },
  },
});

const { actions, reducer } = filtersSlice;
export default reducer;
export const { addItems, removeItems, clearItems, minusItem } = actions;
