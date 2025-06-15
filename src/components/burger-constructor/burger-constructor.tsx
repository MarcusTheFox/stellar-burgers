import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';

// Импорт экшенов
import { createOrder, resetOrderData } from '../../features/feed/feedSlice';
import { resetConstructor } from '../../features/ingredients/ingredientsSlice';

// Типы для данных конструктора
interface ConstructorItem {
  _id: string;
  price: number;
}

interface ConstructorState {
  bun: ConstructorItem | null;
  ingredients: ConstructorItem[];
}

export const BurgerConstructor: FC = () => {
  // Хуки для работы с роутингом и состоянием
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Получаем данные из стора
  const constructorItems = useSelector(
    (state) => state.rootReducer.ingredients.constructor
  ) as ConstructorState;

  const { user } = useSelector((state) => state.rootReducer.user);
  const orderRequest = useSelector(
    (state) => state.rootReducer.orders.isLoading
  );
  const selectedIngredients = useSelector(
    (state) => state.rootReducer.ingredients.selectedIngredients
  );
  const orderModalData = useSelector((state) => state.rootReducer.orders.order);

  // Обработчик оформления заказа
  const handleOrderClick = () => {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // Проверяем наличие булочки и что заказ не в процессе
    if (!constructorItems?.bun || orderRequest) {
      return;
    }

    // Создаем заказ
    const ingredientIds = selectedIngredients.map((item) => item._id);
    dispatch(createOrder(ingredientIds));
  };

  // Обработчик закрытия модального окна заказа
  const handleCloseOrderModal = () => {
    dispatch(resetOrderData());
    dispatch(resetConstructor());
  };

  // Вычисляем итоговую стоимость бургера
  const totalPrice = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
