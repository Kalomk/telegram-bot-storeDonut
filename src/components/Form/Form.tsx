import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';

interface UserDataTypes {
  state: string;
  street: string;
  catPic: string | undefined;
}

const Form = () => {
  const [userData, setUserData] = useState<UserDataTypes>({
    state: '',
    street: '',
    catPic: undefined,
  });
  const [includeCatPic, setIncludeCatPic] = useState(false); // State for the checkbox
  const { tg, queryId } = useTelegram();
  const { cartItems, totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);

  const onHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'catPic' && files && files[0]) {
      try {
        const selectedFile = files[0];
        const base64Data = await encodeBase64(selectedFile);
        setUserData((prev) => ({
          ...prev,
          catPic: base64Data,
        }));
      } catch (error) {
        console.error('Error encoding file to base64:', error);
      }
    } else {
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

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'відправити данні',
    });
  }, []);

  const onSendData = useCallback(() => {
    const { state, street, catPic } = userData;
    const data = {
      products: cartItems,
      totalPrice: totalPrice,
      totalWeight,
      data: { state, street },
      queryId,
    };

    const stringifiedData = JSON.stringify(data);

    // Send the text message
    axios.get(
      `https://api.telegram.org/bot6478934801:AAEAhngq9JoXrGjHlYJQzSgPW_5AEZHwQI4/sendMessage?chat_id=-4022739546&text=${stringifiedData}`
    );

    // Send the photo in base64 format
    if (catPic) {
      axios.get(
        `https://api.telegram.org/bot6478934801:AAEAhngq9JoXrGjHlYJQzSgPW_5AEZHwQI4/sendPhoto?chat_id=-4022739546&photo=${catPic}`
      );
    }
  }, [userData, queryId, cartItems, totalPrice, totalWeight]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    if (!userData.state || !userData.street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
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
        name="street"
        onChange={onHandleChange}
        value={userData.street}
        placeholder="Вулиця"
      />
      <label style={{ marginRight: 'auto' }}>
        <input
          type="checkbox"
          name="includeCatPic"
          checked={includeCatPic}
          onChange={() => setIncludeCatPic(!includeCatPic)}
        />{' '}
        Чи є у вас котик?
      </label>
      {includeCatPic && (
        <input
          type="file"
          accept=""
          name="catPic"
          onChange={onHandleChange}
          className="form__catPic"
          placeholder="Просимо вислати фото кота"
        />
      )}
    </div>
  );
};
export default Form;
