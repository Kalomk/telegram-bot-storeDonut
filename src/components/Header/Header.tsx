import Button from '../Button/Buttons';
import './Header.scss';
import useTelegram from '../../hooks/useTelegram';

const Header = () => {
  const { user, onClose } = useTelegram();

  const btnsItems = ['Cушена риба', 'Кальмари', 'Снеки'];
  return (
    <header className="header">
      <div className="header__btns">
        {btnsItems.map((item) => (
          <Button bg__style="bgempty" onClick={onClose}>
            {item}
          </Button>
        ))}
      </div>
      <span className="username">{user?.username}</span>
    </header>
  );
};

export default Header;
