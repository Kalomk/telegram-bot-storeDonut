import { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import useTelegram from './hooks/useTelegram';
import Header from './components/Header/Header';
import ItemList from './components/ItemList/ItemList';
import Form from './components/Form/Form';

function App() {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
