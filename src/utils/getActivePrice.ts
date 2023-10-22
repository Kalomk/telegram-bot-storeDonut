import { CartItem } from '../slices/cartSlice';

export const getActivePrice = (items: CartItem[]) => {
  return items.map((item) => item.activePrice)[0];
};
