import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';

interface UserDataTypes {
  state: string;
  street: string;
  catPic: undefined | string;
}

const Form = () => {
  const [userData, setUserData] = useState<UserDataTypes>({
    state: '',
    street: '',
    catPic: undefined,
  });

  const onHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'catPic' && files && files[0]) {
      // Check if the input name is 'catPic' and a file is selected
      try {
        const base64Data = await encodeBase64(files[0]);
        setUserData((prev) => ({ ...prev, [name]: base64Data }));
      } catch (error) {
        console.error('Error encoding file to base64:', error);
      }
    } else {
      // Handle other input fields here
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const encodeBase64 = (file: Blob): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const { tg } = useTelegram();
  useEffect(() => {
    tg.MainButton.setParams({
      text: 'відправити данні',
    });
    // eslint-disable-next-line
  }, []);

  const onSendData = useCallback(() => {
    tg.sendData(JSON.stringify(userData));
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
    // eslint-disable-next-line
  }, [onSendData]);

  useEffect(() => {
    if (!userData.state || !userData.street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
    // eslint-disable-next-line
  }, [userData]);

  return (
    <div className="form">
      <h3>Введіть ваші данні</h3>
      <input
        className="form__state"
        type="text"
        name="state"
        placeholder="Країна"
        onChange={onHandleChange}
        value={userData.state}
      />
      <input
        className="form__street"
        type="text"
        name="stree"
        onChange={onHandleChange}
        value={userData.street}
        placeholder="Вулиця"
      />
      <input
        onChange={onHandleChange}
        type="file"
        name="catPic"
        value={userData.catPic}
        className="form__catPic"
      />
    </div>
  );
};
export default Form;
