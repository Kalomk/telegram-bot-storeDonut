import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addPrevItems, clearItems } from '../../slices/cartSlice';
import CartItem from '../Cart/CartItem';
import useTelegram from '../../hooks/useTelegram';
import { RootState } from '@/store';
import './PrevOrder.scss';
import { useNavigate } from 'react-router-dom';

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
  const { tg, chatId } = useTelegram();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToSend, setOrderToSend] = useState<Order | null>(null);
  const [openTabMap, setOpenTabMap] = useState<{ [itemId: number]: boolean }>({});
  const [openProductMenuMap, setOpenProductMenuMap] = useState<{ [itemId: number]: boolean }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentCoutryFromLS = localStorage.getItem('currentCountry');
  const rightCurrentCountry = currentCoutryFromLS ? currentCoutryFromLS : 'Poland';

  const { cartItems, totalPrice, shipPrice, activePrice, totalWeight, isFreeShip } = useSelector(
    (state: RootState) => state.cart
  );
  const isItemChangeClick = useRef<boolean>(false);

  useEffect(() => {
    tg.MainButton.show();
  }, [tg.MainButton]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('https://snakicz-bot.net/userInfo', {
          chatId: '692302840',
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

  useEffect(() => {
    const isEmpty = Object.keys(openProductMenuMap).length === 0;

    if (isEmpty) {
      tg.MainButton.setParams({
        text: `Не повторювати замовлення`,
      });
    } else {
      tg.MainButton.setParams({
        text: `Повторити замовлення`,
      });
      console.log(orderToSend);
    }
  }, [setOpenProductMenuMap, tg.MainButton, openProductMenuMap]);

  const onSendData = useCallback(() => {
    if (orderToSend) {
      const { isCatExist, userNickname, ...rest } = orderToSend;
      const data = {
        data: { ...rest },
        totalPrice,
        totalWeight,
        activePrice,
        rightCurrentCountry,
        rightShipPrice: shipPrice,
        isCatExist,
        freeDelivery: isFreeShip,
        products: cartItems,
        userFromWeb: userNickname,
        chatId: '692302840',
      } as unknown as FormData;
      axios.post('https://snakicz-bot.net/webData', data).then(() => {
        dispatch(clearItems());
      });
      return;
    }
    navigate('/');
  }, [
    activePrice,
    cartItems,
    chatId,
    dispatch,
    isFreeShip,
    navigate,
    orderToSend,
    rightCurrentCountry,
    shipPrice,
    totalPrice,
    totalWeight,
  ]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  const addToCartItems = (items: OrderItem[], id: number, currentOrder: Order) => {
    setOpenTabMap({});
    setOpenProductMenuMap(() => ({
      [id]: true,
    }));
    if (!isItemChangeClick.current) {
      dispatch(clearItems());
      items.forEach((item) => dispatch(addPrevItems(item)));
      setOrderToSend(currentOrder);
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
              onClick={
                currentOrderId ? undefined : () => addToCartItems(orderItemsData, order.id, order)
              }
              key={order.id}
              className={`order-container ${currentOrderId ? ' selected' : ''}`}
            >
              <div className="order-wrapper">
                <div className="order-wrapper__container">
                  <div className="order-wrapper__orderInfo">
                    <div className="order-wrapper__imgs">
                      {orderItemsData.slice(0, 4).map((item) => (
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
                    <p>
                      {' '}
                      безкоштовна доставка:{' '}
                      <span style={order.freeDelivery ? { color: 'yellow' } : { color: 'red' }}>
                        {order.freeDelivery ? 'Так' : 'Ні'}
                      </span>
                    </p>
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
      <button onClick={onSendData}>click</button>
    </div>
  );
};

export default PrevOrders;
