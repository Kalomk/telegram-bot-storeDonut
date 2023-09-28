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
        {product.weight.map((weight, index) => (
          <li key={weight} onClick={() => onIndexWeightSelect(index)}>
            <button className="product_button">{weight}</button>
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
