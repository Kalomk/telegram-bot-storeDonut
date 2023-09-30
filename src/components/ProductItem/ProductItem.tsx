import { ProductType } from '../../slices/productsSlice';
import Button from '../Button/Buttons';
import './ProductItem.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CartItem, addItems } from '../../slices/cartSlice';

interface ProductItemProps {
  product: ProductType;
  className: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const completeId = product.id + product.weight[selectedIndex];
  const cartItem = useSelector((state: RootState) =>
    state.cart.cartItems.find((item) => item.id === completeId)
  );

  const addCount = cartItem ? cartItem.count : null;

  const sendToCart = () => {
    const info: CartItem = {
      id: completeId,
      title: product.title,
      imageUrl: product.img,
      price: product.price,
      weight: product.weight[selectedIndex],
      count: 0,
    };

    dispatch(addItems(info));
  };

  const checkWare =
    addCount === null ? { opacity: 0 } : { opacity: 1, transition: '0.3s ease-in-out 0s ' };

  return (
    <li className={'product ' + className}>
      <img src={product.img} alt="rybki" className="product__img" />
      <div className="product__title">{product.title}</div>
      <div className="product__description">{product.description}</div>
      <div className="product__price">
        <span>Вартість:</span> <b>{product.price}</b>
      </div>
      <ul className="product__weight">
        {product.weight.map((weight, index) => (
          <li key={index + weight} onClick={() => setSelectedIndex(index)}>
            <Button
              bg__style={index === selectedIndex ? 'primary' : 'bgempty'}
              className="product__button"
            >
              {weight}
            </Button>
          </li>
        ))}
      </ul>
      <Button bg__style="primary" className="product__btn" onClick={sendToCart}>
        <span>Додати до корзини</span>
        <i style={checkWare}>{addCount}</i>
      </Button>
    </li>
  );
};
export default ProductItem;