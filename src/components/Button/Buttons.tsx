import { ComponentProps } from 'react';
import './Button.scss';

type ButtonType = ComponentProps<'button'> & ButtonStylesType;

interface ButtonStylesType {
  bg__style: 'primary' | 'bgempty';
}

const Button = (props: ButtonType) => {
  return (
    <button
      {...props}
      className={
        'btn ' + props.className + props.bg__style === 'primary'
          ? ' btn__primary '
          : ' btn__bgempty '
      }
    />
  );
};

export default Button;
