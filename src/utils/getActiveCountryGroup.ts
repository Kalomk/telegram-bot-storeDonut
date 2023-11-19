import { CartItem } from '../slices/cartSlice';

export const getActiveCountryGroup = (items: CartItem[]) => {
  return items.map((item) => item.activeCountry)[0];
};
