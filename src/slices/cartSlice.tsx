import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../utils/calcTotalPrice';
import { getCartFromLs } from '../utils/getCartFromLs';
import { calcTotalWeight } from '../utils/calTotalWeight';
import { getActivePrice } from '../utils/getActivePrice';
import { calculateShip } from '../utils/calcShipPrice';
import { getActiveCountryGroup } from '../utils/getActiveCountryGroup';

export type CartItem = {
  title: string;
  imageUrl: string;
  price: number;
  weight: number;
  id: string | string;
  count: number;
  activePrice: 'zł' | '€';
  activeCountry: string;
};

interface CartSliceState {
  totalPrice: number;
  totalWeight: number;
  cartItems: CartItem[];
  activePrice: 'zł' | '€';
  shipPrice: number;
  isFreeShip: boolean;
  activeCountry: string;
}

const { cartItems, totalPrice, totalWeight, activePrice, isFreeShip, shipPrice, activeCountry } =
  getCartFromLs();
const initialState: CartSliceState = {
  cartItems: cartItems,
  totalPrice: +totalPrice,
  totalWeight: totalWeight,
  activePrice: activePrice,
  activeCountry,
  shipPrice,
  isFreeShip,
};

const setItems = (
  cart: any,
  totalPrice: number,
  totalWeight: number,
  activePrice: 'zł' | '€',
  shipPrice: number,
  isFreeShip: boolean,
  activeCountryGroup: string
) => {
  localStorage.setItem('cart', JSON.stringify(cart.map((item: CartItem) => item)));
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  localStorage.setItem('totalWeight', JSON.stringify(totalWeight));
  localStorage.setItem('activePrice', activePrice);
  localStorage.setItem('shipPrice', shipPrice.toString());
  localStorage.setItem('isFreeShip', isFreeShip.toString());
  localStorage.setItem('activeCountry', activeCountryGroup);
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
      const totalPrice = calcTotalPrice(state.cartItems);
      const activePrice = getActivePrice(state.cartItems);
      const totalWeight = calcTotalWeight(state.cartItems);
      const activeCountry = getActiveCountryGroup(state.cartItems);

      state.totalPrice = +totalPrice;
      state.totalWeight = totalWeight;
      state.activePrice = activePrice;
      state.activeCountry = activeCountry;
      state.shipPrice = calculateShip(
        +totalPrice,
        activePrice,
        totalWeight,
        activeCountry
      ).shipPrice;
      state.isFreeShip = calculateShip(
        +totalPrice,
        activePrice,
        totalWeight,
        activeCountry
      ).freeShip;

      setItems(
        state.cartItems,
        state.totalPrice,
        state.totalWeight,
        state.activePrice,
        state.shipPrice,
        state.isFreeShip,
        state.activeCountry
      );
    },
    addPrevItems: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push({ ...action.payload });

      const totalPrice = calcTotalPrice(state.cartItems);
      const activePrice = getActivePrice(state.cartItems);
      const totalWeight = calcTotalWeight(state.cartItems);
      const activeCountry = getActiveCountryGroup(state.cartItems);

      state.totalPrice = +totalPrice;
      state.totalWeight = totalWeight;
      state.activePrice = activePrice;
      state.activeCountry = activeCountry;
      state.shipPrice = calculateShip(
        +totalPrice,
        activePrice,
        totalWeight,
        activeCountry
      ).shipPrice;
      state.isFreeShip = calculateShip(
        +totalPrice,
        activePrice,
        totalWeight,
        activeCountry
      ).freeShip;

      setItems(
        state.cartItems,
        state.totalPrice,
        state.totalWeight,
        state.activePrice,
        state.shipPrice,
        state.isFreeShip,
        state.activeCountry
      );
    },
    removeItems: (state, action: PayloadAction<string>) => {
      const totalPrice = calcTotalPrice(state.cartItems);
      const activePrice = getActivePrice(state.cartItems);
      const totalWeight = calcTotalWeight(state.cartItems);
      const activeCountry = getActiveCountryGroup(state.cartItems);

      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.totalPrice = +totalPrice;
      state.totalWeight = totalWeight;
      state.activePrice = activePrice;
      state.activeCountry = activeCountry;
      state.shipPrice = calculateShip(
        +totalPrice,
        activePrice,
        totalWeight,
        activeCountry
      ).shipPrice;
      state.isFreeShip = calculateShip(
        +totalPrice,
        activePrice,
        totalWeight,
        activeCountry
      ).freeShip;
      setItems(
        state.cartItems,
        state.totalPrice,
        state.totalWeight,
        state.activePrice,
        state.shipPrice,
        state.isFreeShip,
        state.activeCountry
      );
    },
    clearItems: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalWeight = 0;
      state.isFreeShip = false;
      localStorage.setItem('cart', JSON.stringify(state.cartItems.map((item) => item)));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
      localStorage.setItem('totalWeight', JSON.stringify(state.totalWeight));
      localStorage.setItem('isFreeShip', JSON.stringify(state.isFreeShip));
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find((item) => item.id === action.payload);

      if (findItem) {
        // Decrement the count of the found item
        findItem.count--;

        // Update the state with the modified cartItems array
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload ? findItem : item
        );

        const totalPrice = calcTotalPrice(state.cartItems);
        const activePrice = getActivePrice(state.cartItems);
        const totalWeight = calcTotalWeight(state.cartItems);
        const activeCountry = getActiveCountryGroup(state.cartItems);

        // Recalculate total price, total weight, active price, etc.
        state.totalPrice = +totalPrice;
        state.totalWeight = totalWeight;
        state.activePrice = activePrice;
        state.shipPrice = calculateShip(
          +totalPrice,
          activePrice,
          totalWeight,
          activeCountry
        ).shipPrice;
        state.isFreeShip = calculateShip(
          +totalPrice,
          activePrice,
          totalWeight,
          activeCountry
        ).freeShip;

        // Update other state properties as needed
        setItems(
          state.cartItems,
          state.totalPrice,
          state.totalWeight,
          state.activePrice,
          state.shipPrice,
          state.isFreeShip,
          state.activeCountry
        );
      }
    },
  },
});

const { actions, reducer } = filtersSlice;
export default reducer;
export const { addItems, removeItems, clearItems, minusItem, addPrevItems } = actions;
