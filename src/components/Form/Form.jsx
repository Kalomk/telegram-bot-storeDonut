import { useState, useEffect, useCallback } from 'react';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';

const Form = () => {
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [select, setSelect] = useState('physical');
  const { tg } = useTelegram();
  useEffect(() => {
    tg.MainButton.setParams({
      text: 'відправити данні',
    });
    // eslint-disable-next-line
  }, []);

  const onSendData = useCallback(() => {
    const data = {
      state,
      street,
      select,
    };
    tg.sendData(JSON.stringify(data));
  }, [select, state, street]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    if (!street || !state) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
    // eslint-disable-next-line
  }, [state, street]);
  return (
    <div className="form">
      <h3>Введіть ваші данні</h3>
      <input
        className="form__state"
        type="text"
        placeholder="Країна"
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
      <input
        className="form__street"
        type="text"
        onChange={(e) => setStreet(e.target.value)}
        value={street}
        placeholder="Вулиця"
      />
      <select
        onChange={(e) => setSelect(e.target.value)}
        value={select}
        className="form-control form-control-lg"
      >
        <option value="physical">Фіз.обліччя</option>
        <option value="legal">Юр.обліччя</option>
      </select>
    </div>
  );
};
export default Form;
