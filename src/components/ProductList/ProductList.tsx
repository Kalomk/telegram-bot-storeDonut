import './ItemList.scss';
import { useState, useCallback, useEffect } from 'react';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../../ProductItem/ProductItem';
import img from '../../images/fish-44-1024x602.png';

export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
  img: typeof img;
  weight: number[];
}

const products: ProductType[] = [
  {
    id: '1',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 12,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '2',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 34,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '3',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 14,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '4',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 34,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '5',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 44,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '6',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '7',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 124,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '8',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 34,
    img,
    weight: [100, 200, 250],
  },
  {
    id: '9',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 64,
    img,
    weight: [100, 200, 250],
  },
];
function getTotalPrice(items: ProductType[]) {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
}

const ProductList = () => {
  const [items, setNewitems] = useState<ProductType[]>([]);
  const { tg, queryId } = useTelegram();

  const onAdd = (product: ProductType, selectedIndex: number) => {
    const findProduct = items.find((item) => item.id === product.id);
    let newItem: ProductType[] = [];
    if (findProduct) {
      newItem = items.filter((item) => item.id !== product.id);
    } else {
      newItem = [...items, product];
    }
    setNewitems(newItem);
    if (newItem.length === 0) {
      tg.MainButton.hide();
    } else {
      // console.log(getTotalWeight(newItem, selectedIndex));
      tg.MainButton.show();
      tg.MainButton.setParams({
        // text: `Всього: ${getTotalPrice(newItem)} грн  ${getTotalWeight(
        //   newItem,
        //   selectedIndex
        // )} грам`,
      });
    }
  };
  const onSendData = useCallback(() => {
    const data = {
      products: items,
      totalPrice: getTotalPrice(items),
      queryId,
    };
    fetch('http://85.119.146.179:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [items]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);
  return (
    <ul className="product__items">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} className={'item'} onAdd={onAdd} />
      ))}
    </ul>
  );
};

export default ProductList;
