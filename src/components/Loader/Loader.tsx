import logo from '../../images/snakicz-logo.png';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Loader;
