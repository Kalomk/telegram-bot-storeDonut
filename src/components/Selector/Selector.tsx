import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '../../slices/cartSlice';
import { RootState } from '@/store';
import Button from '../Button/Buttons';
import './Selector.scss';
import { changeActivePrice } from '../../slices/priceFilter';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal/Reveal';
import useTelegram from '../../hooks/useTelegram';
import { useEffect, useState } from 'react';
import CountrySelector, { Countries } from '../CountrySelector/CountrySelector';

interface PriceTypeType {
  value: 'zł' | '€';
  name: string;
}

const Selector = () => {
  const dispatch = useDispatch();
  const priceTypes: PriceTypeType[] = [
    { value: 'zł', name: 'В злотих' },
    { value: '€', name: 'В євро' },
  ];
  const [selectedCountry, setSelectedCountry] = useState<Countries | ''>('');

  const { activePrice } = useSelector((state: RootState) => state.activePrice);

  const navigate = useNavigate();
  const { tg } = useTelegram();

  const changePriceType = (priceType: 'zł' | '€') => {
    dispatch(changeActivePrice(priceType));
  };

  const redirectToShop = () => {
    let path = '/';
    localStorage.removeItem('freeShip');
    dispatch(clearItems());
    navigate(path);
  };

  useEffect(() => {
    tg.onEvent('mainButtonClicked', redirectToShop);
    return () => {
      tg.offEvent('mainButtonClicked', redirectToShop);
    };
  }, []);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Перейти в магазин',
    });
  }, []);

  useEffect(() => {
    selectedCountry !== '' ? tg.MainButton.show() : tg.MainButton.hide();
  }, [selectedCountry, tg.MainButton]);

  return (
    <div className="selector">
      <Reveal>
        <h3 className="mb-[30px]">В якій валюті бажаєте бачити ціни</h3>
      </Reveal>
      <ul className="product__weight">
        {priceTypes.map((priceType) => (
          <Reveal key={priceType.name}>
            <li onClick={() => changePriceType(priceType.value)}>
              {' '}
              <Button
                bg__style={activePrice === priceType.value ? 'primary' : 'bgempty'}
                className="product__button"
                style={{ width: 100, height: 40 }}
              >
                <span>{priceType.name}</span>
              </Button>
            </li>
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <CountrySelector selected={selectedCountry} onSelect={setSelectedCountry} />
      </Reveal>{' '}
    </div>
  );
};

export default Selector;
