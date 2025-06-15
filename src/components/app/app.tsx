import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

// Импорт компонентов интерфейса
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protectedRoute/ProtectedRoute';

// Импорт страниц приложения
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { OrderPage } from '../order-page/order-page';
import { IngredientsDetailsPage } from '../ingredients-details-page/ingredients-details-page';

// Импорт экшенов
import { getUser } from '../../features/user/userSlice';
import { fetchIngredients } from '../../features/ingredients/ingredientsSlice';

// Типы для location state
interface LocationState {
  background?: Location;
}

const App = () => {
  // Хуки для работы с роутингом и состоянием
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем ID выбранного заказа из стора
  const selectedOrderId = useSelector(
    (state) => state.rootReducer.orders.selectedOrderId
  );

  // Получаем background из location state
  const state = location.state as LocationState;

  // Инициализация данных при монтировании компонента
  useEffect(() => {
    // Загружаем список ингредиентов и данные пользователя
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, [dispatch]);

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    navigate(-1);
  };

  // Форматирование номера заказа
  const formatOrderNumber = (id: string | null) => {
    if (!id) return '#000000';
    return `#${id.padStart(6, '0')}`;
  };

  return (
    <div className='app-container'>
      <AppHeader />

      {/* Основные маршруты приложения */}
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* Маршруты аутентификации */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Защищенные маршруты профиля */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* Маршруты для отображения деталей */}
        <Route
          path='/feed/:number'
          element={
            <OrderPage>
              <OrderInfo />
            </OrderPage>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <IngredientsDetailsPage>
              <IngredientDetails />
            </IngredientsDetailsPage>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderPage>
                <OrderInfo />
              </OrderPage>
            </ProtectedRoute>
          }
        />

        {/* Маршрут для несуществующих страниц */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна для отображения деталей */}
      {state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={formatOrderNumber(selectedOrderId)}
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={formatOrderNumber(selectedOrderId)}
                  onClose={handleModalClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
