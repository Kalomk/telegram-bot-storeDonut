import './ItemList.scss';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import { filteredProducts } from '../../slices/filterSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const ProductList = () => {
  const { tg } = useTelegram();
  const { totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const products = useSelector(filteredProducts);
  const navigate = useNavigate();

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
      // Check if the price is above 1000
      if (totalWeight >= 1000) {
        tg.MainButton.setParams({
          text: `Всього: ${totalPrice} zł (Безкоштовна доставка 🎉)`,
          text_color: '#FFFF00',
        });
      } else {
        tg.MainButton.setParams({
          text: `Всього: ${totalPrice} zł   ${totalWeight} грам`,
        });
      }
    }
  }, [totalPrice, totalWeight]);

  return (
    <>
      <Header />
      <ul className="product__items">
        {products.map((item) => (
          <ProductItem key={item.id} product={item} className={'item'} />
        ))}
      </ul>
    </>
  );
};

export default ProductList;
