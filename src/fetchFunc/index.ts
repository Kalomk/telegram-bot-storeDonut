import axios from 'axios';
import { Order } from '../components/PrevOrders/PrevOrders';
import { inputFields } from '../components/Form/validationSchema';

export const getLastDataFromDB = async (chatId: string): Promise<Order | []> => {
  try {
    const response = await axios.post('https://snakicz-bot.net/lastOrder', {
      chatId,
    });
    const jsonedOrder = response.data as Order;
    return jsonedOrder;
  } catch (e) {
    console.log(e);
    return [];
  }
};
export const fetchOrders = async (chatId: string): Promise<Order[] | []> => {
  try {
    const response = await axios.post('https://snakicz-bot.net/userInfo', {
      chatId,
    });
    return response.data as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getLastOrderInfo = async (
  formik: any,
  orderData: Order,
  setSelectedAddress: (arg: 'pack' | 'user' | 'bielsko') => void
) => {
  try {
    // Set individual form field values using formik's setFieldValue method
    inputFields.forEach((field) => {
      formik.setFieldValue(field.name, orderData[field.name as keyof Order] || '');
    });

    // Set selectedAddress based on jsonedOrder values
    if (orderData!.addressPack === 'нема') {
      setSelectedAddress('user');
      formik.setFieldValue('userAddress', orderData!.userAddress);
    } else if (orderData!.userAddress === 'нема') {
      setSelectedAddress('pack');
      formik.setFieldValue('addressPack', orderData!.addressPack);
    } else {
      // Set a default value if neither addressPack nor userAddress is 'нема'
      setSelectedAddress('bielsko');
    }
  } catch (error) {
    console.log(error);
  }
};
