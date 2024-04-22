import { ProductType } from 'snakicz-types';
import Button from '../Button/Buttons';
import './ProductItem.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CartItem, addItems } from '../../slices/cartSlice';
import { filteredPrice } from '../../slices/priceFilter';

interface ProductItemProps {
  product: ProductType;
  className: string;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, className, index }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDescShow, setIsDescShow] = useState<boolean>(false);

  const dispatch = useDispatch();
  const completeId = product.id! + product.weight[selectedIndex];
  const cartItem = useSelector((state: RootState) =>
    state.cart.cartItems.find((item) => item.id! === completeId!.toString())
  );
  const prices = useSelector(filteredPrice);
  const { activePrice } = useSelector((state: RootState) => state.activePrice);
  const { activeCountry } = useSelector((state: RootState) => state.activeCountry);
  const addCount = cartItem ? cartItem.count : null;
  const sendToCart = () => {
    const info: CartItem = {
      id: completeId.toString(),
      title: product.title,
      imageUrl: product.img,
      price: prices[index][selectedIndex],
      weight: product.weight[selectedIndex],
      count: 0,
      activePrice,
      activeCountry,
    };

    dispatch(addItems(info));
  };

  const swapDescShow = () => {
    setIsDescShow((prev) => !prev);
  };

  return (
    <li className={'product ' + className}>
      <div className="flex-wrap">
        {' '}
        <img src={product.img} alt="rybki" className="product__img" />
        <div className="product__title">{product.title}</div>
        {product.description && (
          <div className="product-desc-wrapper">
            <span onClick={swapDescShow}>Відкрити опис ↕</span>
            <ul className={`product__desc ${isDescShow ? 'open' : ''}`}>
              {product.description.split(',').map((desc) => (
                <li key={desc}>{desc}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="product__obj">
          <div className="product__price">
            <span>Вартість:</span>{' '}
            <b>
              {prices[index][selectedIndex]} {activePrice}{' '}
            </b>
          </div>
          <ul className="product__weight">
            {product.weight.map((weight, index) => (
              <li key={index + weight} onClick={() => setSelectedIndex(index)}>
                <Button
                  bg__style={index === selectedIndex ? 'primary' : 'bgempty'}
                  className="product__button"
                >
                  <span style={index === product.weight.length - 1 ? { color: 'red' } : undefined}>
                    {weight}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="product__count">
          <span>Кількість:</span> <b>{product.totalWeightProduct}</b>
        </div>
        <Button
          disabled={!product.isEnable}
          bg__style="primary"
          className="product__btn"
          onClick={sendToCart}
        >
          <span>{!product.isEnable ? 'Нема в наявності' : 'Додати до корзини'}</span>
          {addCount && <i>{addCount}</i>}
        </Button>
      </div>
    </li>
  );
};
export default ProductItem;
