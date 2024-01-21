import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from '../slices/cartSlice';
import { calcTotalWeight } from './calTotalWeight';
import { getActivePrice } from './getActivePrice';
import { calculateShip } from './calcShipPrice';
import { getActiveCountryGroup } from './getActiveCountryGroup';

export const getCartFromLs = () => {
  const data = localStorage.getItem('cart');
  const res = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(res);
  const totalWeight = calcTotalWeight(res);
  const activePrice = getActivePrice(res);
  const activeCountry = getActiveCountryGroup(res)
  const shipPrice = +calculateShip(+totalPrice, activePrice, totalWeight,activeCountry).shipPrice;
  const isFreeShip = calculateShip(+totalPrice, activePrice, totalWeight,activeCountry).freeShip;

  return {
    cartItems: res as CartItem[],
    totalPrice,
    totalWeight,
    activePrice,
    shipPrice,
    isFreeShip,
    activeCountry
  };
};
