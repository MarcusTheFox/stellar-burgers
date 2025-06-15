import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  // Получаем имя пользователя из стора
  const userName = useSelector((state) => state.rootReducer.user.user?.name);

  return <AppHeaderUI userName={userName} />;
};
