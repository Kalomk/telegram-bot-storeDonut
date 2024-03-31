import { CartItem } from 'snakicz-types';

export const mapCartItems = (data: CartItem[]) =>
  data.reduce((acc, item) => {
    // Check if the category is 3
    if (item.title.includes('Сет')) {
      // For category 3, just accumulate the count directly
      if (acc[item.title]) {
        acc[item.title] += item.count;
      } else {
        acc[item.title] = item.count;
      }
    } else {
      // For other categories, accumulate the weight * count
      if (acc[item.title]) {
        acc[item.title] += item.weight * item.count;
      } else {
        acc[item.title] = item.weight * item.count;
      }
    }

    return acc;
  }, {} as Record<string, number>);
