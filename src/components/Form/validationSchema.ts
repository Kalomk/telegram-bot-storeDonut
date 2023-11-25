import * as Yup from 'yup';

export const getValidationSchema = (
  selectedAddress: 'pack' | 'user' | 'bielsko',
  includeCatPic: boolean
) => {
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
    userIndexCity: Yup.string().required('Ви повинні ввести індекс'),
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
      is: () => selectedAddress === 'user' || selectedAddress === 'bielsko',
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

  return validationSchema;
};

export const inputFields = [
  { name: 'userName', label: "Ім'я", type: 'text' },
  { name: 'userLastName', label: 'Прізвище', type: 'text' },
  { name: 'phoneNumber', label: 'Номер телефону', type: 'tel' },
  { name: 'email', label: 'Емейл', type: 'email' },
  { name: 'userCity', label: 'Місто', type: 'text' },
  { name: 'userIndexCity', label: 'Індекс', type: 'text' },
];
