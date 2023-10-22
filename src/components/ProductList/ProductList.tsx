import './ItemList.scss';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import { filteredProducts } from '../../slices/filterSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Reveal from '../Reveal/Reveal';
import arrow from '../../images/icons/_Path_.svg';

const ProductList = () => {
  const { tg } = useTelegram();
  const { totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const products = useSelector(filteredProducts);
  const navigate = useNavigate();
  const { activePrice } = useSelector((state: RootState) => state.activePrice);

  const redirectToCart = () => {
    let path = '/cart';
    navigate(path);
  };

  console.log('total price: ' + totalPrice);

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
          text: `Всього: ${totalPrice} ${activePrice} (Безкоштовна доставка 🎉)`,
          text_color: '#d9dd0b',
        });
      } else {
        tg.MainButton.setParams({
          text: `Всього: ${totalPrice} ${activePrice}   ${totalWeight} грам`,
        });
      }
    }
  }, [totalPrice, totalWeight, tg.MainButton, activePrice]);
  return (
    <div className="product-wrapper">
      <a href="/priceSelect" className="button button--outline button--add go-back-btn">
        <img style={{ width: 25, height: 25, marginBottom: 5 }} src={arrow} alt="" />
        <span>Обрати валюту</span>
      </a>
      <Header />
      <ul className="product__items">
        {products.map((item) => (
          <Reveal key={item.id}>
            <ProductItem product={item} className={'item'} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
