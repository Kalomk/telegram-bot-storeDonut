import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '../../slices/cartSlice';
import { RootState } from '@/store';
import Button from '../Button/Buttons';
import './ActivePriceFilter.scss';
import { changeActivePrice } from '../../slices/priceFilter';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal/Reveal';
import useTelegram from '../../hooks/useTelegram';
import { useEffect } from 'react';

interface PriceTypeType {
  value: 'zł' | '€';
  name: string;
}

const ActivePriceFilter = () => {
  const dispatch = useDispatch();
  const priceTypes: PriceTypeType[] = [
    { value: 'zł', name: 'В злотих' },
    { value: '€', name: 'В євро' },
  ];
  const { activePrice } = useSelector((state: RootState) => state.activePrice);
  const navigate = useNavigate();
  const { tg } = useTelegram();

  const changePriceType = (priceType: 'zł' | '€') => {
    dispatch(changeActivePrice(priceType));
    dispatch(clearItems());
    navigate('/');
  };

  useEffect(() => {
    tg.MainButton.hide();
  }, []);

  return (
    <div className="priceFilter">
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
    </div>
  );
};

export default ActivePriceFilter;
