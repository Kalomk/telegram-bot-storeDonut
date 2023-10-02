import { useDispatch } from 'react-redux';
import { removeItems, minusItem, addItems } from '../../slices/cartSlice';
import './Cart.scss';
import trash from '../../images/icons/iconfinder_trash-2_3324927 1.svg';

type CartItems = {
  title: string;
  imageUrl: string;
  price: number;
  weight: number;
  count: number;
  id: string;
};

const CartItem: React.FC<CartItems> = ({ title, imageUrl, price, weight, count, id }) => {
  const dispatch = useDispatch();

  const Delete = () => {
    if (window.confirm('Are you sure')) {
      dispatch(removeItems(id));
    }
  };
  const plusItem = () => {
    dispatch(addItems({ id } as CartItems));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{weight} грам.</p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={count === 1 ? Delete : () => dispatch(minusItem(id))}
          className="cart__item-count-minus"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15" strokeWidth="2" />
            <path d="M15.0402 15.04H19.8402C20.3704 15.04 20.8002 15.4698 20.8002 16C20.8002 16.5302 20.3704 16.96 19.8402 16.96H15.0402H12.1602C11.63 16.96 11.2002 16.5302 11.2002 16C11.2002 15.4698 11.63 15.04 12.1602 15.04H15.0402Z" />
          </svg>
        </div>
        <b>{count}</b>
        <div onClick={plusItem} className="cart__item-count-plus">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15" strokeWidth="2" />
            <path
              d="M19.8402 15.04H16.9602V12.16C16.9602 11.6299 16.5304 11.2 16.0002 11.2C15.47 11.2 15.0402 11.6299 15.0402 12.16V15.04H12.1602C11.63 15.04 11.2002 15.4699 11.2002 16C11.2002 16.5302 11.63 16.96 12.1602 16.96H15.0402V19.84C15.0402 20.3702 15.47 20.8 16.0002 20.8C16.5304 20.8 16.9602 20.3702 16.9602 19.84V16.96H19.8402C20.3704 16.96 20.8002 16.5302 20.8002 16C20.8002 15.4699 20.3704 15.04 19.8402 15.04Z"
              fill="#35a61b"
            />
          </svg>
        </div>
        <div className="cart__item-price">
          <b>{price * count} zł</b>
        </div>
      </div>
      <div className="cart__item-remove">
        <div onClick={Delete} className="cart__item-remove">
          <img style={{ width: 15, height: 15 }} src={trash} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
