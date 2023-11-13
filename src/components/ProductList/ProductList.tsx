import './ItemList.scss';
import useTelegram from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import { filteredProducts } from '../../slices/filterSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Reveal from '../Reveal/Reveal';
import arrow from '../../images/icons/_Path_.svg';

interface ShipPriceType {
  under3: { eu: number; pl: number };
  upper3: { eu: number; pl: number };
  free: { eu: number; pl: number };
}

const ProductList = () => {
  const { tg } = useTelegram();
  const { totalPrice, totalWeight, activePrice } = useSelector((state: RootState) => state.cart);
  const { activeCountry } = useSelector((state: RootState) => state.activeCountry);

  const products = useSelector(filteredProducts);
  const navigate = useNavigate();

  const activeCoutryFromLS = localStorage.getItem('activeCountry');
  const rightCountryGroup = activeCoutryFromLS ? +activeCoutryFromLS : activeCountry;

  const currentCoutryFromLS = localStorage.getItem('currentCountry');
  const rightCurrentCountry = currentCoutryFromLS ? currentCoutryFromLS : 'Poland';

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

  const calculateZloty = (value: number) => {
    return parseFloat((value * 4.5).toString());
  };

  const calculateShip = useCallback((activeCountry: number): ShipPriceType => {
    switch (activeCountry.toString()) {
      case '0':
        return { under3: { eu: 4, pl: 17 }, upper3: { eu: 6, pl: 19 }, free: { eu: 28, pl: 125 } };
      case '1':
        return {
          under3: { eu: 5, pl: 5 },
          upper3: { eu: 8, pl: 8 },
          free: { eu: 80, pl: calculateZloty(80) },
        };
      case '2':
        return {
          under3: { eu: 16, pl: calculateZloty(16) },
          upper3: { eu: 18, pl: calculateZloty(18) },
          free: { eu: 180, pl: calculateZloty(180) },
        };
      case '3':
        return {
          under3: { eu: 16, pl: calculateZloty(16) },
          upper3: { eu: 23, pl: calculateZloty(23) },
          free: { eu: 230, pl: calculateZloty(230) },
        };
      case '4':
        return {
          under3: { eu: 23, pl: calculateZloty(23) },
          upper3: { eu: 23, pl: calculateZloty(23) },
          free: { eu: 230, pl: calculateZloty(230) },
        };
      case '5':
        return {
          under3: { eu: 23, pl: calculateZloty(23) },
          upper3: { eu: 27, pl: calculateZloty(27) },
          free: { eu: 230, pl: calculateZloty(230) },
        };
      case '6':
        return {
          under3: { eu: 25, pl: calculateZloty(25) },
          upper3: { eu: 27, pl: calculateZloty(27) },
          free: { eu: 270, pl: calculateZloty(270) },
        };
      case '7':
        return {
          under3: { eu: 27, pl: calculateZloty(27) },
          upper3: { eu: 27, pl: calculateZloty(27) },
          free: { eu: 270, pl: calculateZloty(270) },
        };
      case '8':
        return {
          under3: { eu: 34, pl: calculateZloty(34) },
          upper3: { eu: 34, pl: calculateZloty(34) },
          free: { eu: 270, pl: calculateZloty(270) },
        };
      default:
        return {
          under3: { eu: 17, pl: calculateZloty(17) },
          upper3: { eu: 19, pl: calculateZloty(19) },
          free: { eu: 340, pl: calculateZloty(340) },
        };
    }
  }, []);

  useEffect(() => {
    const shipPrice = calculateShip(rightCountryGroup)[totalWeight >= 3000 ? 'upper3' : 'under3'];
    const freeShip = calculateShip(rightCountryGroup).free;

    if (!totalPrice) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      // Check if the price is above 1000
      if (
        (activePrice === 'zł' && totalPrice >= freeShip.pl) ||
        (activePrice === '€' && totalPrice >= freeShip.eu)
      ) {
        tg.MainButton.setParams({
          text: `Всього: ${totalPrice} ${activePrice} (Безкоштовна доставка 🎉)`,
          text_color: '#d9dd0b',
        });
        localStorage.setItem('freeShip', true.toString());
      } else {
        tg.MainButton.setParams({
          text: `Всього: ${totalPrice} ${activePrice} ${
            activePrice === 'zł' ? `Доставка: ${shipPrice.pl} zł` : `Доставка: ${shipPrice.eu} €`
          }`,
        });
        localStorage.setItem(
          'shipPrice',
          activePrice === 'zł' ? shipPrice.pl.toString() : shipPrice.eu.toString()
        );
        localStorage.removeItem('freeShip');
      }
    }
  }, [
    totalPrice,
    totalWeight,
    tg.MainButton,
    activePrice,
    activeCountry,
    calculateShip,
    rightCountryGroup,
    rightCurrentCountry,
  ]);
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
