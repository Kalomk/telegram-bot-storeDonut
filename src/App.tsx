import { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import useTelegram from './hooks/useTelegram';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Cart from './components/Cart/Cart';
import SendForm from './components/SendForm/SendForm';
import Selector from './components/Selector/Selector';

function App() {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/form" element={<Form />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sendOrderNumber" element={<SendForm />} />
        <Route path="/priceSelect" element={<Selector />} />
      </Routes>
    </div>
  );
}

export default App;
