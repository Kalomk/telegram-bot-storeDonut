import Button from '../Button/Buttons';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeProductFilter } from '../../slices/filterSlice';
import { RootState } from '../../store';

const Header = () => {
  const dispatch = useDispatch();
  const btnsItems = ['Всі', 'Cушена риба', 'Кальмари', 'Сети'];
  const { activeFilter } = useSelector((state: RootState) => state.filters);
  return (
    <header className="header">
      <div className="header__btns">
        {btnsItems.map((item, index) => (
          <Button
            key={item}
            bg__style={activeFilter === index ? 'primary' : 'bgempty'}
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
