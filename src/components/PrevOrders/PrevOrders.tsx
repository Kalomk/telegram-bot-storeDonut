import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItems, clearItems } from '../../slices/cartSlice';
import CartItem from '../Cart/CartItem';
import useTelegram from '../../hooks/useTelegram';
import { RootState } from '@/store';
import './PrevOrder.scss';

type OrderItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  weight: number;
  count: number;
  activePrice: 'zł' | '€';
  activeCountry: string;
};

export type Order = {
  id: number;
  userName: string;
  userLastName: string;
  addressPack: string;
  userAddress: string;
  userCity: string;
  userIndexCity: string;
  userNickname: string;
  isCatExist: boolean;
  orderNumber: string;
  freeDelivery: boolean;
  totalPrice: number;
  activePrice: string;
  phoneNumber: string;
  contactPhoneNumber: string;
  email: string;
  totalWeight: number;
  orderItems: OrderItem[];
  isStatisted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

const PrevOrders = () => {
  const { tg } = useTelegram();
  const chatId = tg?.initDataUnsafe?.id;
  const [orders, setOrders] = useState<Order[]>([]);
  const [openTabMap, setOpenTabMap] = useState<{ [itemId: number]: boolean }>({});
  const [openProductMenuMap, setOpenProductMenuMap] = useState<{ [itemId: number]: boolean }>({});
  const dispatch = useDispatch();
  const { cartItems, totalPrice, shipPrice, activePrice } = useSelector(
    (state: RootState) => state.cart
  );
  const isItemChangeClick = useRef<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('http://localhost:8000/userInfo', {
          chatId: 692302840,
        });

        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const changeActiveItem = (id: number) => {
    setOpenTabMap((prevIds) => ({
      [id]: !prevIds[id],
    }));
  };

  const addToCartItems = (items: OrderItem[], id: number) => {
    setOpenTabMap({});
    setOpenProductMenuMap(() => ({
      [id]: true,
    }));
    if (!isItemChangeClick.current) {
      dispatch(clearItems());
      items.forEach((item) => dispatch(addItems(item)));
      isItemChangeClick.current = true;
    }
    isItemChangeClick.current = false;
  };

  return (
    <div className="prevOrders">
      <div>
        {orders.map((order) => {
          const orderItemsData = JSON.parse(order.orderItems as unknown as string) as OrderItem[];
          const date = new Date(order.createdAt);
          const options = {
            weekday: undefined, // omit the weekday
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
          };
          const currentOrderId = openProductMenuMap[order.id];
          const formattedDate = date.toLocaleString(
            'default',
            options as Intl.DateTimeFormatOptions
          );
          return (
            <div
              onClick={currentOrderId ? undefined : () => addToCartItems(orderItemsData, order.id)}
              key={order.id}
              className={`order-container ${currentOrderId ? ' selected' : ''}`}
            >
              <div className="order-wrapper">
                <div className="order-wrapper__container">
                  <div className="order-wrapper__orderInfo">
                    <div className="order-wrapper__imgs">
                      {orderItemsData.map((item) => (
                        <img key={item.imageUrl} src={item.imageUrl} alt="img" />
                      ))}
                    </div>
                    <div>
                      <p>{`Замовник: ${order.userName} ${order.userLastName}`}</p>
                      <p>{`Номер замовлення: ${order.orderNumber}`}</p>
                    </div>
                  </div>
                  <div className="order-wrapper__sumData">
                    <span>Заказ від: {formattedDate}</span>
                    <span>
                      Загальна ціна:{' '}
                      {`${currentOrderId ? totalPrice + shipPrice : order.totalPrice} ${
                        currentOrderId ? activePrice : order.activePrice
                      }`}
                    </span>
                  </div>
                </div>
              </div>
              {currentOrderId ? (
                <div className="order-items">
                  <span onClick={() => changeActiveItem(order.id)}>
                    {!openTabMap[order.id] ? 'Показати список товарів ▼' : 'Згорнути список ▲'}
                  </span>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`order-item ${openTabMap[order.id] ? ' open ' : ''}`}
                    >
                      <CartItem {...item} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>Натисніть, щоб редагувати замовлення</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrevOrders;
