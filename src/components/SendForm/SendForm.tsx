import useTelegram from '../../hooks/useTelegram';
import React, { useState, useEffect, useCallback } from 'react';

const SendForm = () => {
  const [mailTitle, setMailTitle] = useState('');
  const [packageNumber, setPackageNumber] = useState('');
  const { tg } = useTelegram();

  const handleMailTitleChange = (e: any) => {
    setMailTitle(e.target.value);
  };

  const handlePackageNumberChange = (e: any) => {
    setPackageNumber(e.target.value);
  };
  useEffect(() => {
    tg.MainButton.setParams({
      text: 'відправити данні',
    });
  }, []);

  const onSendData = useCallback(() => {
    const data = {
      mailTitle,
      packageNumber,
    };
    tg.sendData(JSON.stringify(data));
  }, [mailTitle, packageNumber, tg]);

  useEffect(() => {
    if (!mailTitle || !packageNumber) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [mailTitle, packageNumber, tg.MainButton]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  return (
    <div>
      <h2>Відправити пошту</h2>
      <form>
        <div>
          <label htmlFor="mailTitle">Назва пошти:</label>
          <input
            type="text"
            id="mailTitle"
            value={mailTitle}
            onChange={handleMailTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="packageNumber">Номер посилки:</label>
          <input
            type="text"
            id="packageNumber"
            value={packageNumber}
            onChange={handlePackageNumberChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default SendForm;
