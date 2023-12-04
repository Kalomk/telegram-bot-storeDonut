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
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../../slices/productsSlice';
import { AnyAction } from 'redux';
import Loader from '../Loader/Loader';

const ProductList = () => {
  const { tg } = useTelegram();
  const { totalPrice, totalWeight, activePrice, isFreeShip, shipPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const { activeCountry } = useSelector((state: RootState) => state.activeCountry);
  const status = useSelector((state: RootState) => state.products.loading);

  const products = useSelector(filteredProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectToCart = () => {
    let path = '/cart';
    navigate(path);
  };

  useEffect(() => {
    dispatch(fetchProduct() as unknown as AnyAction);
  }, [dispatch]);

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
        {status === 'pending' ? (
          <Loader />
        ) : (
          products.map((item) => (
            <Reveal key={item.id}>
              <ProductItem product={item} className={'item'} />
            </Reveal>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductList;
