import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addPrevItems, clearItems } from '../../slices/cartSlice';
import CartItem from '../Cart/CartItem';
import useTelegram from '../../hooks/useTelegram';
import { RootState } from '@/store';
import './PrevOrder.scss';
import { useNavigate } from 'react-router-dom';
import useGetData from '../../hooks/useGetData';
import { fetchOrders } from '../../fetchFunc';

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

const ORDER_STATUS_MAP = {
  true: { color: 'yellow', text: 'Так' },
  false: { color: 'red', text: 'Ні' },
};

const PrevOrders = () => {
  const { tg, chatId } = useTelegram();
  const { data, isLoading } = useGetData(() => fetchOrders(chatId));
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

  const changeActiveItem = (id: number) => {
    setOpenTabMap((prevIds) => ({
      [id]: !prevIds[id],
    }));
  };

  useEffect(() => {
    const isEmpty = Object.keys(openProductMenuMap).length === 0;
    const buttonText = isEmpty ? 'Не повторювати замовлення' : 'Повторити замовлення';

    tg.MainButton.setParams({
      text: buttonText,
    });
  }, [setOpenProductMenuMap, tg.MainButton, openProductMenuMap, orderToSend]);

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
        chatId,
      } as unknown as FormData;

      dispatch(clearItems());
      axios.post('https://snakicz-bot.net/webData', data);
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

  const renderOrderItems = (order: Order) => {
    return (
      <div className="order-items">
        <span onClick={() => changeActiveItem(order.id)}>
          {!openTabMap[order.id] ? 'Показати список товарів ▼' : 'Згорнути список ▲'}
        </span>
        {openTabMap[order.id] &&
          cartItems.map((item) => (
            <div key={item.id} className={`order-item ${openTabMap[order.id] ? ' open ' : ''}`}>
              <CartItem {...item} />
            </div>
          ))}
      </div>
    );
  };

  const renderOrder = (order: Order) => {
    const currentOrderId = openProductMenuMap[order.id];
    const checkRightTotalPrice = currentOrderId ? totalPrice + shipPrice : order.totalPrice;
    const checkRightActivePrice = currentOrderId ? activePrice : order.activePrice;
    const checkRightIsFreeShip = (currentOrderId ? isFreeShip : order.freeDelivery).toString();
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
    const formattedDate = date.toLocaleString('default', options as Intl.DateTimeFormatOptions);

    return (
      <div
        onClick={currentOrderId ? undefined : () => addToCartItems(orderItemsData, order.id, order)}
        key={order.id}
        className={`order-container ${currentOrderId ? ' selected' : ''}`}
      >
        <div className="order-wrapper">
          <div className="order-wrapper__container">
            <div className="order-wrapper__orderInfo">
              <div>
                <p>{`Замовник: ${order.userName} ${order.userLastName}`}</p>
                <p>{`Номер замовлення: ${order.orderNumber}`}</p>
              </div>
            </div>
            <div className="order-wrapper__sumData">
              <span>Заказ від: {formattedDate}</span>
              <span>Загальна ціна: {`${checkRightTotalPrice} ${checkRightActivePrice}`}</span>
              <p>
                {' '}
                безкоштовна доставка:{' '}
                <span
                  style={{
                    color:
                      ORDER_STATUS_MAP[checkRightIsFreeShip as keyof typeof ORDER_STATUS_MAP].color,
                  }}
                >
                  {ORDER_STATUS_MAP[checkRightIsFreeShip as keyof typeof ORDER_STATUS_MAP].text}
                </span>
              </p>
            </div>
          </div>
        </div>
        {currentOrderId ? renderOrderItems(order) : <div>Натисніть, щоб редагувати замовлення</div>}
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div className="prevOrders">{data.map((order) => renderOrder(order))}</div>;
};

export default PrevOrders;
