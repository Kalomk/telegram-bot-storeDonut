import { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import useTelegram from './hooks/useTelegram';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Cart from './components/Cart/Cart';
import ScrollToTop from './components/ScrollToTop/SccrollToTop';

function App() {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Routes>
        <ScrollToTop />
        <Route path="/" element={<ProductList />} />
        <Route path="/form" element={<Form />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
