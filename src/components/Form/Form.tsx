import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import arrow from '../../images/icons/_Path_.svg';

export interface UserDataTypes {
  userName: string;
  userLastName: string;
  phoneNumber: string;
  email: string;
  userIndexCity: string;
  addressPack?: string;
  userCity: string;
  userAddress?: string;
  catPic: File | null;
}

const Form = () => {
  const [userData, setUserData] = useState<UserDataTypes>({
    userName: '',
    userLastName: '',
    phoneNumber: '',
    email: '',
    userIndexCity: '',
    addressPack: '',
    userCity: '',
    userAddress: '',
    catPic: null,
  });
  const [includeCatPic, setIncludeCatPic] = useState(false); // State for the checkbox
  const [includePack, setIncludePack] = useState(false); // State for the checkboxes
  const [includeAddress, setIncludeAddress] = useState(false); // State for the checkboxes

  const { tg, queryId } = useTelegram();
  const { cartItems, totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);

  const onHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'catPic' && files && files[0]) {
      try {
        const selectedFile = files[0];
        setUserData((prev) => ({
          ...prev,
          catPic: selectedFile,
        }));
      } catch (error) {
        console.error('Error encoding file to base64:', error);
      }
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'відправити данні',
    });
  }, []);

  const onSendData = useCallback(async () => {
    const { catPic, userName } = userData;
    const data = {
      data: { userName },
      totalPrice,
      totalWeight,
      freeDelivery: totalWeight >= 1000,
      products: cartItems,
      queryId,
    };

    const formData = new FormData();
    formData.append('chat_id', '-4022739546'); // Replace with your chat ID
    if (catPic) {
      formData.append('photo', catPic);
    }

    await axios.post(
      `https://api.telegram.org/bot6478934801:AAEAhngq9JoXrGjHlYJQzSgPW_5AEZHwQI4/sendPhoto`,
      formData
    );
    tg.sendData(JSON.stringify(data));
  }, [userData, totalPrice, totalWeight, queryId, cartItems, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    if (
      !userData.userName ||
      !userData.userLastName ||
      !userData.phoneNumber ||
      !userData.email ||
      !userData.userCity
    ) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [userData]);

  return (
    <div className="form">
      <div
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <a href="/cart" className="button button--outline button--add go-back-btn">
          <img style={{ width: 25, height: 25 }} src={arrow} alt="" />
          <span>Кошик</span>
        </a>
        <h3>Введіть ваші данні</h3>
      </div>

      <input
        className="form__state"
        type="text"
        name="userName"
        placeholder="Ім'я"
        onChange={onHandleChange}
        value={userData.userName}
      />
      <input
        className="form__street"
        type="text"
        name="userLastName"
        onChange={onHandleChange}
        value={userData.userLastName}
        placeholder="Прізвище"
      />
      <input
        className="form__street"
        type="tel"
        name="phoneNumber"
        onChange={onHandleChange}
        value={userData.phoneNumber}
        placeholder="Номер телефону"
      />
      <input
        className="form__street"
        type="email"
        name="email"
        onChange={onHandleChange}
        value={userData.email}
        placeholder="Емейл"
      />
      <div
        style={{
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="form__address"
      >
        {!includeAddress && (
          <label className="labels">
            <div>
              {' '}
              <input
                type="checkbox"
                name="includeCatPic"
                checked={includeCatPic}
                onChange={() => setIncludePack(!includePack)}
              />{' '}
              <span>Я знаю свій пачкомат</span>
            </div>
          </label>
        )}
        {!includePack && (
          <label className="labels">
            <div>
              {' '}
              <input
                type="checkbox"
                name="includeCatPic"
                checked={includeCatPic}
                onChange={() => setIncludeAddress(!includeAddress)}
              />{' '}
              <span>Визначити пачкомат автоматично</span>
            </div>
          </label>
        )}
        {includeAddress || includePack ? (
          <>
            <input
              className="form__street"
              type="text"
              name="userCity"
              onChange={onHandleChange}
              value={userData.userCity}
              placeholder="Місто"
            />
            <input
              className="form__street"
              type="text"
              name="userIndexCity"
              onChange={onHandleChange}
              value={userData.userIndexCity}
              placeholder="Індекс"
            />
            {includePack ? (
              <input
                className="form__street"
                type="text"
                name="addressPack"
                onChange={onHandleChange}
                value={userData.addressPack}
                placeholder="Точна адреса пачкомату"
              />
            ) : (
              <input
                className="form__street"
                type="text"
                name="userAddress"
                onChange={onHandleChange}
                value={userData.userAddress}
                placeholder="Ваша адреса"
              />
            )}
          </>
        ) : null}
      </div>
      <label className="labels" style={{ marginRight: 'auto' }}>
        <div>
          {' '}
          <input
            type="checkbox"
            name="includeCatPic"
            checked={includeCatPic}
            onChange={() => setIncludeCatPic(!includeCatPic)}
          />{' '}
          <span>Я маю кицю</span>
        </div>
      </label>
      {includeCatPic && (
        <label>
          <input
            type="file"
            accept=""
            name="catPic"
            onChange={onHandleChange}
            className="form__catPic"
            placeholder="Просимо вислати фото кота"
          />
          <span>( Вишліть фото кота та отримайте подарунок )</span>
        </label>
      )}
    </div>
  );
};
export default Form;
