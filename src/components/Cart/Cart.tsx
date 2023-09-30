import trash from '../../images/icons/iconfinder_trash-2_3324927 1.svg';
import car from '../../images/icons/shopcar.svg';
import arrow from '../../images/icons/_Path_.svg';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../slices/cartSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RootState } from '../../store';
import './Cart.scss';

const Cart: React.FC = () => {
  const { cartItems, totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const totalCount = cartItems.reduce((sum: number, item: any) => sum + item.count, 0);

  const Clear = () => {
    if (window.confirm('Are you sure want to clear all pizzas')) {
      dispatch(clearItems());
    }
  };

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
                кількість всіх продуктів: <b>{totalCount}</b>{' '}
              </span>
              <span>
                {' '}
                кількість в гривнях: <b>{totalPrice}$</b>{' '}
              </span>
              <span>
                {' '}
                кількість в граммах: <b>{totalWeight}$</b>{' '}
              </span>
            </div>
            <TransitionGroup component="div">{element}</TransitionGroup>
            <div className="cart__bottom-buttons">
              <a href="/" className="button button--outline button--add go-back-btn">
                <img src={arrow} alt="" />
                <span>Назад</span>
              </a>
              <div className="button pay-btn">
                <span>Перейти далі</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
