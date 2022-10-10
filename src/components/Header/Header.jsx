import Button from '../Button/Buttons';
import './Header.scss';
import useTelegram from '../../hooks/useTelegram';

const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <header className="header">
      <Button onClick={onClose}>Закрити</Button>
      <span className="username">{user?.username}</span>
    </header>
  );
};
