import Button from '../Button/Buttons';
import './Header.scss';
import useTelegram from '../../hooks/useTelegram';
import { useDispatch } from 'react-redux';
import { changeProductFilter } from '../../slices/filterSlice';

const Header = () => {
  const { user } = useTelegram();
  const dispatch = useDispatch();
  const btnsItems = ['Всі', 'Cушена риба', 'Кальмари', 'Снеки'];
  return (
    <header className="header">
      <div className="header__btns">
        {btnsItems.map((item, index) => (
          <Button
            key={item}
            bg__style="bgempty"
            onClick={() => dispatch(changeProductFilter(index))}
          >
            {item}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header;
