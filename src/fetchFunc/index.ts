import axios from 'axios';
import { OrderType } from 'snakicz-types';
import { inputFields } from '../components/Form/validationSchema';

export const getLastDataFromDB = async (chatId: string): Promise<OrderType | []> => {
  try {
    const response = await axios.post('https://snakicz-bot.net/orders/getLastAddedOrderForUser', {
      uniqueId: chatId,
    });
    const jsonedOrder = response.data as OrderType;
    console.log('order: ' + JSON.stringify(jsonedOrder));

    return jsonedOrder;
  } catch (e) {
    console.log(e);
    return [];
  }
};
export const fetchOrders = async (chatId: string): Promise<OrderType[] | []> => {
  try {
    const response = await axios.post('https://snakicz-bot.net/orders/getOrdersByUniqueId', {
      uniqueId: chatId,
    });
    return response.data as OrderType[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getLastOrderInfo = async (
  formik: any,
  orderData: OrderType,
  setSelectedAddress: (arg: 'pack' | 'user' | 'bielsko') => void
) => {
  try {
    // Set individual form field values using formik's setFieldValue method
    inputFields.forEach((field) => {
      formik.setFieldValue(field.name, orderData[field.name as keyof OrderType] || '');
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
