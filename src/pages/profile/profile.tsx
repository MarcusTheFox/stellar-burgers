import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../features/user/userSlice';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  // Получаем пользователя из стора
  const user = useSelector((state) => state.rootReducer.user.user);
  const dispatch = useDispatch();

  // Состояние формы профиля
  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  // Синхронизация формы с изменениями пользователя
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  // Проверка, изменена ли форма
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // Обработчик отправки формы
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await dispatch(updateUser(formValue));
    if (result.meta.requestStatus === 'fulfilled') {
      setFormValue({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: ''
      });
    }
  };

  // Обработчик отмены изменений
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
