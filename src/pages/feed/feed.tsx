import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { fetchOrders } from '../../features/feed/feedSlice';
import { fetchIngredients } from '../../features/ingredients/ingredientsSlice';

export const Feed: FC = () => {
  // Получаем список заказов из стора
  const { orders } = useSelector((state) => state.rootReducer.orders.feed);
  const dispatch = useDispatch();

  // Загружаем заказы при монтировании
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Если заказы еще не загружены, показываем прелоадер
  if (!orders.length) {
    return <Preloader />;
  }

  // Основной рендер страницы
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchOrders());
        dispatch(fetchIngredients());
      }}
    />
  );
};
