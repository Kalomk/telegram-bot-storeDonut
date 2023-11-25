import { CartItem } from '../slices/cartSlice';

export const calcTotalWeight = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.weight * obj.count + sum, 0);
};
