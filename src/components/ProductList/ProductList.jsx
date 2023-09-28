import './ItemList.scss';
import { useState, useCallback, useEffect } from 'react';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../../ProductItem/ProductItem';
import img from './fish-44-1024x602.png';

const products = [
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
function getTotalPrice(items = []) {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
}

function getTotalWeight(items = [], selectedIndex) {
  return items.reduce((acc, item) => {
    return (acc += item.weight[selectedIndex]);
  }, 0);
}

function getSelectedIndex(selectedIndex = 0) {
  return selectedIndex;
}
const ProductList = () => {
  const [items, setNewitems] = useState([]);
  const { tg, queryId } = useTelegram();
  const onAdd = (product) => {
    const findProduct = items.find((item) => item.id === product.id);
    let newItem = [];
    if (findProduct) {
      newItem = items.filter((item) => item.id !== product.id);
    } else {
      newItem = [...items, product];
    }
    setNewitems(newItem);
    if (newItem.length === 0) {
      tg.MainButton.hide();
    } else {
      console.log(`вес: ${getTotalWeight(newItem, getSelectedIndex())} грам`);
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Всього: ${getTotalPrice(newItem)} грн         ${getTotalWeight(
          newItem,
          getSelectedIndex()
        )} грам`,
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
        <ProductItem
          selectIndexWeight={getSelectedIndex}
          key={item.id}
          product={item}
          className={'item'}
          onAdd={onAdd}
        />
      ))}
    </ul>
  );
};

export default ProductList;
