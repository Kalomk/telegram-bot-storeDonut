import React, { useEffect, useCallback, ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import arrow from '../../images/icons/_Path_.svg';
import { CartItem, clearItems } from '../../slices/cartSlice';
import Button from '../Button/Buttons';
import { getValidationSchema, inputFields } from './validationSchema';
import { getLastDataFromDB, getLastOrderInfo } from '../../serverFunc';
import { Order } from '../PrevOrders/PrevOrders';

export interface UserDataTypes {
  userName: string;
  userLastName: string;
  phoneNumber: string;
  email: string;
  userIndexCity: string;
  addressPack?: string;
  userCity: string;
  userAddress?: string;
  catPic?: File | undefined | any;
}

export interface FormData {
  data: UserDataTypes;
  totalPrice: number;
  totalWeight: number;
  activePrice: string;
  rightCurrentCountry: string;
  rightShipPrice: number;
  isCatExist: boolean;
  freeDelivery: boolean;
  products: CartItem[]; // Assuming OrderItem is another type/interface
  userFromWeb: string;
  chatId: string; // Assuming UserType is another type/interface
}

const Form = () => {
  const dispatch = useDispatch();

  const { tg, user, chatId } = useTelegram();
  const { cartItems, totalPrice, totalWeight, shipPrice, isFreeShip } = useSelector(
    (state: RootState) => state.cart
  );
  const [includeCatPic, setIncludeCatPic] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<'pack' | 'user' | 'bielsko'>('user');
  const { activePrice } = useSelector((state: RootState) => state.activePrice);

  const [prevOrderInfo, setPrevOrderInfo] = useState<Order | []>([]);

  const currentCoutryFromLS = localStorage.getItem('currentCountry');
  const rightCurrentCountry = currentCoutryFromLS ? currentCoutryFromLS : 'Poland';
  const validationSchema = getValidationSchema(selectedAddress, includeCatPic);

  const initialValues = {
    userName: '',
    userLastName: '',
    phoneNumber: '',
    email: '',
    userIndexCity: '',
    addressPack: '',
    userCity: '',
    userAddress: '',
    catPic: undefined,
  };

  const formik = useFormik<UserDataTypes>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const data: FormData = {
        data: values,
        totalPrice,
        totalWeight,
        activePrice,
        rightCurrentCountry,
        rightShipPrice: shipPrice,
        isCatExist: !!values.catPic,
        freeDelivery: isFreeShip,
        products: cartItems,
        userFromWeb: user?.username,
        chatId: '692302840',
      };

      const sendingData = async () => {
        resetForm();
        dispatch(clearItems());
        await axios.post('https://snakicz-bot.net/webData', data);
      };

      sendingData();
    },
  });

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value as 'pack' | 'user' | 'bielsko');
    // If selectedAddress is 'bielsko', set userCity to 'Bielsko'
    if (e.target.value === 'bielsko') {
      formik.setFieldValue('userCity', 'Bielsko-Biala');
      formik.setFieldValue('userIndexCity', '43-300');
    } else {
      formik.setFieldValue('userCity', '');
      formik.setFieldValue('userIndexCity', '');
    }
  };

  const onHandleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target) {
      const { name, value } = e.target;

      // Check if the element is a file input
      if (e.target.type === 'file') {
        const fileInput = e.target as HTMLInputElement;
        if (fileInput.files && fileInput.files[0]) {
          const selectedFile = fileInput.files[0];
          formik.setFieldValue('catPic', selectedFile);
        }
      } else {
        formik.setFieldValue(name, value);
      }
    }
  };

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Відправити данні',
    });
  }, []);

  const onSendData = useCallback(() => {
    formik.handleSubmit();
  }, [formik]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    // Check if the form is valid based on the Yup schema
    validationSchema.isValid(formik.values).then((valid) => {
      if (!valid) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }
    });
  }, [formik.values]);

  useEffect(() => {
    getLastDataFromDB().then((order) => setPrevOrderInfo(order));
  }, []);

  return (
    <div className="form-wrapper">
      <a href="/cart" className="button">
        <img style={{ width: 25, height: 25, marginBottom: 3 }} src={arrow} alt="" />
        <span>Кошик</span>
      </a>
      <div className="form">
        <h3>Введіть ваші данні </h3>
        {!Array.isArray(prevOrderInfo) && (
          <Button
            bg__style={'primary'}
            onClick={() => getLastOrderInfo(formik, prevOrderInfo, setSelectedAddress)}
          >
            Повторити замовлення
          </Button>
        )}
        {inputFields.slice(0, 4).map(({ name, label, type }) => {
          const fieldName = name as keyof typeof initialValues; // Explicitly define the type of 'name'
          const value = formik.values[fieldName];
          const error = formik.errors[fieldName];
          const touch = formik.touched[fieldName];
          return (
            <React.Fragment key={fieldName}>
              <>
                <input
                  className="form__street"
                  type={type}
                  name={name}
                  placeholder={label}
                  onChange={onHandleChange}
                  value={value}
                  onBlur={formik.handleBlur} // Add onBlur event handler
                />
                {touch && error && <div className="error">{error as string}</div>}
              </>
            </React.Fragment>
          );
        })}
        <select
          disabled={formik.values.addressPack !== '' || formik.values.userAddress !== ''}
          value={selectedAddress}
          onChange={(e) => onSelectChange(e)}
          className={'select'}
        >
          <option value={'pack'}>Я знаю свій пачкомат</option>
          <option value={'user'}>Визначити пачкомат автоматично</option>
          <option value={'bielsko'}>Безкоштовна доставка по м. Белсько-Бяла</option>
        </select>
        {selectedAddress === 'pack' && (
          <>
            <input
              className="form__street"
              type="text"
              name="addressPack"
              onChange={onHandleChange}
              value={formik.values.addressPack}
              placeholder="Точна адреса пачкомату"
              onBlur={formik.handleBlur} // Add onBlur event handler
            />
            {formik.touched.addressPack && formik.errors.addressPack && (
              <div className="error">{formik.errors.addressPack}</div>
            )}
          </>
        )}
        {(selectedAddress === 'user' || selectedAddress === 'bielsko') && (
          <>
            <input
              className="form__street"
              type="text"
              name="userAddress"
              onChange={onHandleChange}
              value={formik.values.userAddress}
              placeholder="Ваша адреса"
              onBlur={formik.handleBlur} // Add onBlur event handler
            />
            {formik.touched.userAddress && <div className="error">{formik.errors.userAddress}</div>}
          </>
        )}
        {inputFields.slice(4).map(({ name, label, type }) => {
          const fieldName = name as keyof typeof initialValues; // Explicitly define the type of 'name'
          const value = formik.values[fieldName];
          const error = formik.errors[fieldName];
          const touch = formik.touched[fieldName];
          return (
            <React.Fragment key={fieldName}>
              <>
                <input
                  className="form__street"
                  type={type}
                  name={name}
                  placeholder={label}
                  onChange={onHandleChange}
                  value={value}
                  onBlur={formik.handleBlur} // Add onBlur event handler
                />
                {touch && error && <div className="error">{error as string}</div>}
              </>
            </React.Fragment>
          );
        })}
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
              name="catPic"
              onChange={onHandleChange}
              className="form__catPic"
              placeholder="Просимо вислати фото кота"
            />
            <span>
              Надішліть фото своєї киці та отримайте для неї подарунок (акція діє для замовлень
              загальною вагою від одного 1 кг){' '}
            </span>
            {formik.errors.catPic && <div className="error">{formik.errors.catPic as string}</div>}
          </label>
        )}
      </div>
      <button onClick={onSendData}>click</button>
    </div>
  );
};

export default Form;
