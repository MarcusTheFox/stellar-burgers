import { FC, useEffect } from 'react';
import { OrderPageUI } from '../ui/order-page';
import { OrderPageProps } from './type';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrdersById,
  selectOrderById
} from '../../features/feed/feedSlice';

export const OrderPage: FC<OrderPageProps> = ({ children }) => {
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector((state) =>
    number ? selectOrderById(state, number) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersById(number ?? ''));
  }, [dispatch]);

  return <OrderPageUI title={orderData?.number}>{children}</OrderPageUI>;
};
