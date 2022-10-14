import './ItemList.scss';
import { useState } from 'react';
import useTelegram from '../../hooks/useTelegram';
const products = [
  {
    id: '1',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '2',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '3',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '4',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '5',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '6',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '7',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '8',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
  {
    id: '9',
    title: 'Donatello pizza',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
  },
];
function getTotalPrice(items = []) {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  });
}
const ProductList = () => {
  const [items, setNewitems] = useState([]);
  const { tg } = useTelegram();
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
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купити ${getTotalPrice(newItem)}`,
      });
    }
  };
  return (
    <ul className="product__items">
      {products.map((item) => (
        <ProductList key={item.id} products={item} className={'item'} onAdd={onAdd} />
      ))}
    </ul>
  );
};

export default ProductList;
