import trash from '../../images/icons/iconfinder_trash-2_3324927 1.svg';
import car from '../../images/icons/shopcar.svg';
import arrow from '../../images/icons/_Path_.svg';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../slices/cartSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RootState } from '../../store';
import './Cart.scss';
import Button from '../Button/Buttons';
import { useEffect } from 'react';
import useTelegram from '../../hooks/useTelegram';

const Cart: React.FC = () => {
  const { cartItems, totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const totalCount = cartItems.reduce((sum: number, item: any) => sum + item.count, 0);
  const { tg } = useTelegram();

  const Clear = () => {
    if (window.confirm('Are you sure want to clear all pizzas')) {
      dispatch(clearItems());
    }
  };
  useEffect(() => {
    tg.MainButton.hide();
  }, []);

  const element = cartItems.map((item) => {
    return (
      <CSSTransition classNames="cart__item" key={item.id} timeout={500}>
        <CartItem {...item} />
      </CSSTransition>
    );
  });
  return (
    <div className="content">
      <div className="content__wrapper">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <img src={car} alt="" />
              Car
            </h2>
            <div onClick={Clear} className="cart__clear">
              <img src={trash} alt="" />
              <span>Очистити корзину</span>
            </div>
          </div>
          <div className="content__items"></div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                {' '}
                кільсть позицій: <b>{totalCount}</b>{' '}
              </span>
              <span>
                {' '}
                сума: <b>{totalPrice} zł</b>
              </span>
              <span>
                {' '}
                вага замолення: <b>{totalWeight} грам</b>{' '}
              </span>
            </div>
            <TransitionGroup component="div">{element}</TransitionGroup>
            <div className="cart__bottom-buttons" style={{ marginTop: 10 }}>
              <Button bg__style="primary">
                <a href="/" className="button button--outline button--add go-back-btn">
                  <img src={arrow} alt="" />
                  <span>Назад</span>
                </a>
              </Button>
              <Button bg__style="primary" className="button pay-btn">
                <a href="/form">
                  {' '}
                  <span>Перейти далі</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
