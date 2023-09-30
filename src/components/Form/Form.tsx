import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface UserDataTypes {
  state: string;
  street: string;
  catPic: string | undefined; // Change the type to File | null
  catPicName: string; // To store the selected file name
}

const Form = () => {
  const [userData, setUserData] = useState<UserDataTypes>({
    state: '',
    street: '',
    catPic: undefined, // Initialize catPic as null
    catPicName: '', // Initialize catPicName as an empty string
  });
  const { tg, queryId } = useTelegram();
  const { cartItems, totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);

  const onHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'catPic' && files && files[0]) {
      // Check if the input name is 'catPic' and a file is selected
      try {
        const selectedFile = files[0];
        const base64Data = await encodeBase64(selectedFile);
        setUserData((prev) => ({
          ...prev,
          catPic: base64Data,
          catPicName: selectedFile.name, // Set the selected file name
        }));
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

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'відправити данні',
    });
    // eslint-disable-next-line
  }, []);

  const onSendData = useCallback(() => {
    const data = {
      products: cartItems,
      totalPrice: totalPrice,
      totalWeight,
      userData,
      queryId,
    };
    // fetch('http://85.119.146.179:8000/web-data', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    tg.sendData(JSON.stringify(data));
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
        name="street"
        onChange={onHandleChange}
        value={userData.street}
        placeholder="Вулиця"
      />
      <input
        type="file"
        accept=""
        name="catPic"
        onChange={onHandleChange}
        className="form__catPic"
      />
      {userData.catPicName && <p>Обране фото: {userData.catPicName}</p>}
    </div>
  );
};
export default Form;
