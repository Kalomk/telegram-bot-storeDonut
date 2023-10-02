import trash from '../../images/icons/iconfinder_trash-2_3324927 1.svg';
import arrow from '../../images/icons/_Path_.svg';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../slices/cartSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RootState } from '../../store';
import './Cart.scss';
import { useEffect } from 'react';
import useTelegram from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const totalCount = cartItems.reduce((sum: number, item: any) => sum + item.count, 0);
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const Clear = () => {
    if (window.confirm('Are you sure want to clear all products')) {
      dispatch(clearItems());
    }
  };

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Оформити замовлення',
    });
  }, []);

  useEffect(() => {
    if (!totalPrice) {
      navigate('/');
    }
  }, [totalPrice]);

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
            <a href="/" className="button button--outline button--add go-back-btn">
              <img style={{ width: 50, height: 50 }} src={arrow} alt="" />
              <span>Магазин</span>
            </a>
            <div onClick={Clear} className="cart__clear">
              <img src={trash} alt="trash" />
              <span>Очистити корзину</span>
            </div>
          </div>
          <div className="content__items"></div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                {' '}
                Кільсть позицій: <b>{totalCount}</b>{' '}
              </span>
              <span>
                {' '}
                Сума: <b>{totalPrice} zł</b>
              </span>
              <span>
                {' '}
                Вага замолення: <b>{totalWeight} грам</b>{' '}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              {' '}
              <TransitionGroup component="div">{element}</TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
