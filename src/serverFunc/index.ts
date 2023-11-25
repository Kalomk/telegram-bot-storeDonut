import axios from 'axios';
import { Order } from '../components/PrevOrders/PrevOrders';
import { inputFields } from '../components/Form/validationSchema';

export const getLastOrderInfo = async (
  formik: any,
  setSelectedAddress: (arg: 'pack' | 'user' | 'bielsko') => void
) => {
  try {
    const response = await axios.post('http://localhost:8000/lastOrder', {
      chatId: 692302840,
    });

    const jsonedOrder = response.data as Order;

    // Set individual form field values using formik's setFieldValue method
    inputFields.forEach((field) => {
      formik.setFieldValue(field.name, jsonedOrder[field.name as keyof Order] || '');
    });

    // Set selectedAddress based on jsonedOrder values
    if (jsonedOrder.addressPack === 'нема') {
      setSelectedAddress('user');
      formik.setFieldValue('userAddress', jsonedOrder.userAddress);
    } else if (jsonedOrder.userAddress === 'нема') {
      setSelectedAddress('pack');
      formik.setFieldValue('addressPack', jsonedOrder.addressPack);
    } else {
      // Set a default value if neither addressPack nor userAddress is 'нема'
      setSelectedAddress('bielsko');
    }
  } catch (error) {
    console.log(error);
  }
};
