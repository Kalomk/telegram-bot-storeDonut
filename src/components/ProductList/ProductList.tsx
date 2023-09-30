import './ItemList.scss';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import { filteredProducts } from '../../slices/filterSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const { tg } = useTelegram();
  const { totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const products = useSelector(filteredProducts);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

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
    if (!totalPrice && location.pathname !== '/cart') {
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
