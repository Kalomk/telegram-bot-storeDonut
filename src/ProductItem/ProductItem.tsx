import { ProductType } from '@/components/ProductList/ProductList';
import Button from '../components/Button/Buttons';
import './ProductItem.scss';
import { useState } from 'react';

interface ProductItemProps {
  product: ProductType;
  className: string;
  onAdd: (product: ProductType, selectedIndex: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, className, onAdd }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onCartAdd = () => {
    onAdd(product, selectedIndex);
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
          <li key={index + weight} onClick={() => setSelectedIndex(index)}>
            <Button bg__style="bgempty" className="product__button">
              {weight}
            </Button>
          </li>
        ))}
      </ul>
      <Button bg__style="primary" className="product__btn" onClick={onCartAdd}>
        Додати до корзини
      </Button>
    </li>
  );
};
export default ProductItem;
