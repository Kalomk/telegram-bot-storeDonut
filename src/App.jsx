import { useEffect } from 'react';
import './App.scss';
import useTelegram from './hooks/useTelegram';

function App() {
  const { tg, onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
}

export default App;
