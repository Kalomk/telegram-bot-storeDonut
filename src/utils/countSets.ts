import { ProductType } from 'snakicz-types';

export const countSets = (arr: ProductType[], amount: { [title: string]: number }): number => {
  const updatedArr = arr.map(({ totalWeightProduct, ...rest }) => {
    const dividedItemWeight = Math.floor(Number(totalWeightProduct) / amount[rest.title]);

    return { ...rest, totalWeightProduct: dividedItemWeight };
  });

  const minWeightNumber = Math.min(...updatedArr.map((item) => item.totalWeightProduct));

  return minWeightNumber;
};
