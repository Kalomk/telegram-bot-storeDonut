import Button from '../components/Button/Buttons';
import './ProductItem.scss';

const ProductItem = ({ product, className, onAdd }) => {
  const onCartAdd = () => {
    onAdd(product);
  };
  return (
    <li className={'product ' + className}>
      <div className="product__title">{product.title}</div>
      <img src={product.img} alt="rybki" className="product__img" />
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
