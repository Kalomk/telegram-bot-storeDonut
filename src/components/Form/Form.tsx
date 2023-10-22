import React, { useEffect, useCallback, ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import useTelegram from '../../hooks/useTelegram';
import './Form.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import axios from 'axios';
import arrow from '../../images/icons/_Path_.svg';
import { clearItems } from '../../slices/cartSlice';
import * as Yup from 'yup';

export interface UserDataTypes {
  userName: string;
  userLastName: string;
  phoneNumber: string;
  email: string;
  userIndexCity: string;
  addressPack?: string;
  userCity: string;
  userAddress?: string;
  catPic: File | undefined | any;
}

const Form = () => {
  const dispatch = useDispatch();

  const { tg, queryId } = useTelegram();
  const { cartItems, totalPrice, totalWeight } = useSelector((state: RootState) => state.cart);
  const [includeCatPic, setIncludeCatPic] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<'pack' | 'user' | 'bielsko'>('user');
  const { activePrice } = useSelector((state: RootState) => state.activePrice);

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

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[a-zA-ZęĘóÓąĄśŚłŁżŻźŹćĆńŃ\s]*$/, "Ім'я повинно містити лише латинські літери")
      .required("Ім'я обов'язкове поле"),
    userLastName: Yup.string()
      .matches(/^[a-zA-ZęĘóÓąĄśŚłŁżŻźŹćĆńŃ\s]*$/, 'Прізвище повинно містити лише латинські літери')
      .required("Прізвище обов'язкове поле"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]*$/, 'Номер телефону повинен містити лише цифри')
      .required("Номер телефону обов'язковий")
      .min(9, 'Номер повинен містити 9 символів'),
    email: Yup.string()
      .email('Некоректна адреса електронної пошти')
      .required("Електронна пошта обов'язкове поле"),
    userCity: Yup.string()
      .matches(/^[a-zA-ZęĘóÓąĄśŚłŁżŻźŹćĆńŃ\s-]*$/, 'Місто повинно містити лише латинські літери')
      .required("Місто обов'язкове поле"),
    userIndexCity: Yup.string()
      .matches(/^[0-9\s-]*$/, 'Номер телефону повинен містити лише цифри')
      .when([], {
        is: () => selectedAddress === 'bielsko',
        then: (schema) => schema.min(0).notRequired(),
        otherwise: (schema) =>
          schema.min(5, 'Мінімальна кількість символів 5').required("Індекс міста обов'язковий"),
      }),
    addressPack: Yup.string().when([], {
      is: () => selectedAddress === 'pack',
      then: (schema) =>
        schema
          .min(5, 'Мінімальна кількість символів 5')
          .matches(
            /^[a-zA-Z0-9ęĘóÓąĄśŚłŁżŻźŹćĆńŃ\s-]*$/,
            'Адреса повинна містити лише латинські літери'
          )
          .required("Адреса пачкомату обов'язкова"),
      otherwise: (schema) => schema.min(0).notRequired(),
    }),
    userAddress: Yup.string().when([], {
      is: () => selectedAddress === 'user',
      then: (schema) =>
        schema
          .min(5)
          .matches(
            /^[a-zA-Z0-9ęĘóÓąĄśŚłŁżŻźŹćĆńŃ\s-]*$/,
            'Ваша адреса повинна містити лише латинські літери'
          )
          .required("Ваша адреса обов'язкова"),
      otherwise: (schema) => schema.min(0).notRequired(),
    }),
    catPic: Yup.mixed().when([], {
      is: () => includeCatPic,
      then: (schema) => schema.required('Вишліть фото кота'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const formik = useFormik<UserDataTypes>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { catPic, ...rest } = values;
      const data = {
        data: { ...rest },
        totalPrice,
        totalWeight,
        activePrice,
        isCatExist: !!catPic,
        freeDelivery: totalWeight >= 1000,
        products: cartItems,
        queryId,
      };

      const formData = new FormData();
      formData.append('chat_id', '-1001820916737'); // Replace with your chat ID
      if (catPic) {
        formData.append('photo', catPic);
        axios.post(
          `https://api.telegram.org/bot6478934801:AAEAhngq9JoXrGjHlYJQzSgPW_5AEZHwQI4/sendPhoto`,
          formData
        );
      }
      tg.sendData(JSON.stringify(data));
      resetForm();
      dispatch(clearItems());
    },
  });

  const onHandleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
        // If selectedAddress is 'bielsko', set userCity to 'Bielsko'
        if (selectedAddress === 'bielsko') {
          formik.setFieldValue('userCity', 'Bielsko-Biala');
          formik.setFieldValue('userIndexCity', '43-300');
        }
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

  const inputFields = [
    { name: 'userName', label: "Ім'я", type: 'text' },
    { name: 'userLastName', label: 'Прізвище', type: 'text' },
    { name: 'phoneNumber', label: 'Номер телефону', type: 'tel' },
    { name: 'email', label: 'Емейл', type: 'email' },
    { name: 'userCity', label: 'Місто', type: 'text' },
    { name: 'userIndexCity', label: 'Індекс', type: 'text' },
  ];

  return (
    <div className="form-wrapper">
      <a href="/cart" className="button button--outline button--add go-back-btn">
        <img style={{ width: 25, height: 25, marginBottom: 3 }} src={arrow} alt="" />
        <span>Кошик</span>
      </a>
      <div className="form">
        <h3>Введіть ваші данні</h3>
        {inputFields.map(({ name, label, type }) => {
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
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value as 'pack' | 'user' | 'bielsko')}
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
    </div>
  );
};

export default Form;
