import Button from '../components/Button/Buttons';
import './ProductItem.scss';

const ProductItem = ({ product, className, onAdd, selectIndexWeight }) => {
  const onCartAdd = () => {
    onAdd(product);
  };

  const onIndexWeightSelect = (indexWeight) => {
    selectIndexWeight(indexWeight);
  };
  return (
    <li className={'product ' + className}>
      <img src={product.img} alt="rybki" className="product__img" />
      <div className="product__title">{product.title}</div>
      <div className="product__description">{product.description}</div>
      <div className="product__price">
        <span>Вартість:</span> <b>{product.price}</b>
      </div>
      <ul className="product__weight">
        {product.weight.map((item, index) => (
          <li key={item} onClick={() => onIndexWeightSelect(index)}>
            <Button className="proudct_button"></Button>
          </li>
        ))}
      </ul>
      <Button className="prouct__btn" onClick={onCartAdd}>
        додати в корзину
      </Button>
    </li>
  );
};
export default ProductItem;
