import { ProductType } from '../../slices/productsSlice';
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
}

const ProductItem: React.FC<ProductItemProps> = ({ product, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDescShow, setIsDescShow] = useState<boolean>(false);

  const dispatch = useDispatch();
  const completeId = product.id + product.weight[selectedIndex];
  const cartItem = useSelector((state: RootState) =>
    state.cart.cartItems.find((item) => item.id === completeId)
  );
  const prices = useSelector(filteredPrice);
  const { activePrice } = useSelector((state: RootState) => state.activePrice);
  const addCount = cartItem ? cartItem.count : null;
  const sendToCart = () => {
    const info: CartItem = {
      id: completeId,
      title: product.title,
      imageUrl: product.img,
      price: prices[Number(product.id)][selectedIndex],
      weight: product.weight[selectedIndex],
      count: 0,
      activePrice,
    };

    dispatch(addItems(info));
  };

  const swapDescShow = () => {
    setIsDescShow((prev) => !prev);
  };

  return (
    <li className={'product ' + className}>
      <img src={product.img} alt="rybki" className="product__img" />
      <div className="product__title">{product.title}</div>
      {product.description && (
        <div className="product-desc-wrapper">
          <span onClick={swapDescShow}>Опис...</span>
          <ul className={`product__desc ${isDescShow ? '' : ' hide'}`}>
            {product.description.split(',').map((desc) => (
              <li>{desc}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="product__price">
        <span>Вартість:</span>{' '}
        <b>
          {prices[Number(product.id)][selectedIndex]} {activePrice}{' '}
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
      <Button bg__style="primary" className="product__btn" onClick={sendToCart}>
        <span>Додати до корзини</span>
        {addCount && <i>{addCount}</i>}
      </Button>
    </li>
  );
};
export default ProductItem;
