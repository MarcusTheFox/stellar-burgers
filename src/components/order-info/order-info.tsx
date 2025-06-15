import { FC, useEffect, useMemo } from 'react';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectOrderById,
  setSelectedOrderId
} from '../../features/feed/feedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector((state) =>
    number ? selectOrderById(state, number) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedOrderId(number ?? null));
  }, [number]);

  const ingredients: TIngredient[] = useSelector(
    (state) => state.rootReducer.ingredients.ingredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    // return <Preloader />;
    return;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
