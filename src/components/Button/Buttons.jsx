import './Button.scss';

const Button = (props) => {
  return <button {...props} className={'btn ' + props.className} />;
};

export default Button;
