import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

// Типы для пропсов компонента
interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean; // Флаг для маршрутов, доступных только неавторизованным пользователям
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  // Получаем данные о пользователе и состоянии загрузки
  const { user } = useSelector((state) => state.rootReducer.user);
  const isUserDataOnInitLoaded = useSelector(
    (state) => state.rootReducer.user.isUserDataOnInitLoaded
  );

  const location = useLocation();

  // Отображаем прелоадер во время загрузки данных пользователя
  if (!isUserDataOnInitLoaded) {
    return <Preloader />;
  }

  // Перенаправляем авторизованного пользователя с маршрутов для неавторизованных
  if (onlyUnAuth && user) {
    return <Navigate to='/' replace />;
  }

  // Перенаправляем неавторизованного пользователя на страницу входа
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Если все проверки пройдены, отображаем защищенный контент
  return <>{children}</>;
};
