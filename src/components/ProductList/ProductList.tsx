import './ItemList.scss';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import img from '../../images/fish-44-1024x602.png';
import { filteredProducts } from '../../slices/filterSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
  img: typeof img;
  weight: number[];
}

const ProductList = () => {
  const { tg, queryId } = useTelegram();
  const { totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const products = useSelector(filteredProducts);
  const navigate = useNavigate();
  // const onAdd = (product: ProductType, selectedIndex: number) => {
  //   const findProduct = items.find((item) => item.id === product.id);
  //   let newItem: ProductType[] = [];
  //   if (findProduct) {
  //     newItem = items.filter((item) => item.id !== product.id);
  //   } else {
  //     newItem = [...items, product];
  //   }
  //   setNewitems(newItem);
  //   if (newItem.length === 0) {
  //     tg.MainButton.hide();
  //   } else {
  //     console.log(getTotalWeight(newItem, selectedIndex));
  //     tg.MainButton.show();
  //     tg.MainButton.setParams({
  //       text: `Всього: ${getTotalPrice(newItem)} грн  ${getTotalWeight(
  //         newItem,
  //         selectedIndex
  //       )} грам`,
  //     });
  //   }
  // };

  const redirectToCart = () => {
    let path = '/cart';
    navigate(path);
  };

  useEffect(() => {
    tg.onEvent('mainButtonClicked', redirectToCart);
    return () => {
      tg.offEvent('mainButtonClicked', redirectToCart);
    };
  }, []);

  useEffect(() => {
    if (!totalPrice) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Всього: ${totalPrice} грн  ${totalWeight} грам`,
      });
    }
  }, [totalPrice]);

  return (
    <ul className="product__items">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} className={'item'} />
      ))}
    </ul>
  );
};

export default ProductList;
