import { CartItem, ProductType } from 'snakicz-types';
import { countSets } from './countSets';
import { mapCartItems } from './mapCartItems';

type UpdatedWeightsType = (
  amounts: Record<string, number>,
  products: ProductType[]
) => ProductType[];

const filteredSets: UpdatedWeightsType = (amounts, products) => {
  return products.filter((p) => p.category && amounts[p.title] !== undefined);
};

const findElement = (products: ProductType[], title: string) =>
  products.findIndex((item) => item.title === title);

const duplicateElementsWithWeights: UpdatedWeightsType = (amounts, arr) => {
  let result: any[] = [];

  arr.forEach((obj) => {
    const title = obj.title;
    const weight = amounts[title] || 1; // Default to 1 if no weight is provided

    result = result.concat(Array(weight).fill(obj));
  });

  return result;
};

const updateWeights: UpdatedWeightsType = (amounts, products) => {
  return products.map((item) => {
    const { totalWeightProduct, ...rest } = item;
    const subtractedValue = amounts[rest.title] ?? 0;
    const updatedValue = totalWeightProduct - subtractedValue;

    return { ...rest, totalWeightProduct: updatedValue };
  });
};

export const updateProductWeightFromProductTotalWeight = (
  products: ProductType[],
  cartItems: CartItem[]
) => {
  if (!cartItems) {
    throw new Error('No Cart items');
  }

  //init array data of old products
  let initialArr = [...products];

  const amounts = mapCartItems(cartItems);

  //find sets from array
  const sets = filteredSets(amounts, products);

  //if sets exits replace their calculated data with old products
  if (sets.length > 0) {
    const dublicatedSets = duplicateElementsWithWeights(amounts, sets);
    initialArr = flattenSets(dublicatedSets, initialArr);
  }

  // calculate single products
  const updatedSingleWeights = updateWeights(amounts, initialArr);

  //keys of product weight

  //update count of each sets
  const updatedBuyCountProducts = updatedSingleWeights.map((product, _, arr) => {
    const { totalProductWeightFromProducts, totalWeightProduct, totalBuyCount, ...rest } = product;

    // Calculate matching count for the current product
    const matchingCount = cartItems.reduce((count, amount) => {
      if (rest.title.includes(amount.title)) {
        return count + amount.count;
      }
      return count;
    }, 0);

    // Calculate the updated total buy count
    let updatedTotalBuyCount = totalBuyCount + matchingCount;

    return {
      ...rest,
      totalProductWeightFromProducts,
      totalBuyCount: updatedTotalBuyCount,
      totalWeightProduct,
    };
  });

  //initialize new arr
  const finilizeArray = [...updatedBuyCountProducts] as ProductType[];

  //count sets
  updatedBuyCountProducts.forEach((set, _, arr) => {
    const { totalProductWeightFromProducts, totalWeightProduct, totalBuyCount, ...rest } = set;

    const keysOfProductWeight = Object.keys(totalProductWeightFromProducts);

    if (set.category === 3 && keysOfProductWeight.length > 0) {
      const filteredItems = arr.filter((p) => keysOfProductWeight.includes(p.title));

      cartItems.forEach((item) => {
        if (item.title.includes(rest.title)) {
          const findedSetListOProudct = Object.keys(
            arr[findElement(arr, item.title)].totalProductWeightFromProducts
          );
          for (const title of findedSetListOProudct) {
            finilizeArray[findElement(arr, title)].totalBuyCount += item.count;
          }
        } else {
          finilizeArray[findElement(arr, rest.title)] = {
            ...rest,
            totalProductWeightFromProducts,
            totalBuyCount,
            totalWeightProduct: countSets(filteredItems, totalProductWeightFromProducts),
          };
        }
      });
    }
  });

  return finilizeArray;
};

const flattenSets = (sets: ProductType[], products: ProductType[]): ProductType[] => {
  return sets.reduce(
    (flattened, set) => updateWeights(set.totalProductWeightFromProducts, flattened),
    products
  );
};

// Example usage:
// const updatedProducts = updateProductWeightFromProductTotalWeight(amounts, yourProductsArray);
