import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from '../slices/cartSlice';
import { calcTotalWeight } from './calTotalWeight';
import { getActivePrice } from './getActivePrice';

export const getCartFromLs = () => {
  const data = localStorage.getItem('cart');
  const res = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(res);
  const totalWeight = calcTotalWeight(res);
  const activePrice = getActivePrice(res);

  return {
    cartItems: res as CartItem[],
    totalPrice,
    totalWeight,
    activePrice,
  };
};
