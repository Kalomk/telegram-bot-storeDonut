import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '../../slices/cartSlice';
import { RootState } from '@/store';
import Button from '../Button/Buttons';
import './ActivePriceFilter.scss';
import { changeActivePrice } from '../../slices/priceFilter';
import { useNavigate } from 'react-router-dom';
import Reveal from '../Reveal/Reveal';

const ActivePriceFilter = () => {
  const dispatch = useDispatch();
  const priceTypes: ['zł', 'eu'] = ['zł', 'eu'];
  const { activePrice } = useSelector((state: RootState) => state.activePrice);
  const navigate = useNavigate();

  const changePriceType = (priceType: 'zł' | 'eu') => {
    dispatch(changeActivePrice(priceType));
    dispatch(clearItems());
    navigate('/');
  };

  return (
    <div className="priceFilter">
      <Reveal>
        <h3 className="mb-[30px]">Оберіть валюту</h3>
      </Reveal>
      <ul className="product__weight">
        {priceTypes.map((priceType) => (
          <Reveal key={priceType}>
            <li onClick={() => changePriceType(priceType)}>
              {' '}
              <Button
                bg__style={activePrice === priceType ? 'primary' : 'bgempty'}
                className="product__button"
              >
                <span>{priceType}</span>
              </Button>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
};

export default ActivePriceFilter;
