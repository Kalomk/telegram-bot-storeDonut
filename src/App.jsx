import { useEffect } from 'react';
import './App.scss';
import useTelegram from './hooks/useTelegram';
import Header from './components/Header/Header';

function App() {
  const { tg, onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
}

export default App;
