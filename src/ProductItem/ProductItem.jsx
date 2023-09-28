import Button from '../components/Button/Buttons';
import './ProductItem.scss';

const ProductItem = ({ product, className, onAdd, img }) => {
  const onCartAdd = () => {
    onAdd(product);
  };
  return (
    <li className={'product ' + className}>
      <div className="product__title">{product.title}</div>
      <div className="product__img">{img}</div>
      <div className="product__description">{product.description}</div>
      <div className="product__price">
        <span>Вартість:</span> <b>{product.price}</b>
      </div>
      <Button className="prouct__btn" onClick={onCartAdd}>
        додати в корзину
      </Button>
    </li>
  );
};
export default ProductItem;
