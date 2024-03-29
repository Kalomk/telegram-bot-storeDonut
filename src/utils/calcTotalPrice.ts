import { CartItem } from '../slices/cartSlice';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0).toFixed(2);
};
