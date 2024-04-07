import logo from '../../images/snakicz-logo.png';
import './Loader.scss';

const Loader = ({ children, mt = '120px' }: { children?: JSX.Element; mt?: string }) => {
  return (
    <div style={{ marginTop: mt }} className="loader">
      <img src={logo} alt="logo" />
      {children}
    </div>
  );
};

export default Loader;
