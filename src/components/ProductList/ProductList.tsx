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
  const { tg,user,chatId } = useTelegram();
  const { totalPrice, totalWeight, activePrice, isFreeShip, shipPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const { activeCountry } = useSelector((state: RootState) => state.activeCountry);

  const products = useSelector(filteredProducts);
  const navigate = useNavigate();

  const redirectToCart = () => {
    let path = '/cart';
    navigate(path);
  };

  useEffect(() => {
    tg.onEvent('mainButtonClicked', redirectToCart);
    console.log(tg)
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
      if (isFreeShip) {
        tg.MainButton.setParams({
          text: `Всього: ${totalPrice} ${activePrice} (Безкоштовна доставка 🎉)`,
          text_color: '#d9dd0b',
        });
      } else {
        tg.MainButton.setParams({
          text: `Всього: ${totalPrice} ${activePrice} Доставка: ${shipPrice} ${activePrice}`,
        });
      }
    }
  }, [totalPrice, totalWeight, tg.MainButton, activePrice, activeCountry, isFreeShip, shipPrice]);

  return (
    <div className="product-wrapper">
      <a href="/priceSelect" className="button button--outline button--add go-back-btn mb-[15px]">
        <img style={{ width: 25, height: 25, marginBottom: 2.5 }} src={arrow} alt="" />
        <span>Валюта та країна</span>
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
