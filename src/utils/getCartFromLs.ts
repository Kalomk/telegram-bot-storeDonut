import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from '../slices/cartSlice';
import { calcTotalWeight } from './calTotalWeight';

export const getCartFromLs = () => {
  const data = localStorage.getItem('cart');
  const res = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(res);
  const totalWeight = calcTotalWeight(res);

  return {
    cartItems: res as CartItem[],
    totalPrice,
    totalWeight,
  };
};
