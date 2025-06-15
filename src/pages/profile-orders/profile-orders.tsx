import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrders } from '../../features/feed/feedSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  // Получаем заказы пользователя из стора
  const orders: TOrder[] = useSelector(
    (state) => state.rootReducer.orders.feed.orders
  );
  const dispatch = useDispatch();

  // Загружаем заказы пользователя при монтировании
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
