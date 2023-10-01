import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface UserDataTypes {
  state: string;
  street: string;
  catPic: File | undefined;
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

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'catPic' && files && files[0]) {
      setUserData((prev) => ({
        ...prev,
        catPic: files[0],
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'відправити данні',
    });
  }, []);

  const onSendData = useCallback(() => {
    const { state, street, catPic } = userData;
    if (!state || !street) {
      return;
    }

    const photo = catPic ? { file: catPic } : undefined;

    tg.sendData({
      type: 'photo',
      chat_id: -4022739546, // Replace with your chat ID
      caption: JSON.stringify({ state, street }),
      photo,
    });
  }, [userData, tg]);

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
          accept="image/*"
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
