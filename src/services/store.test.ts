import { combineReducers } from '@reduxjs/toolkit';
import { expect } from '@jest/globals';

// Импорт редьюсеров
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import userReducer from '../features/user/userSlice';
import ordersReducer from '../features/feed/feedSlice';

// Объединение редьюсеров для тестирования
const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer
});

// Тесты для корневого редьюсера
describe('rootReducer', () => {
  it('should return the correct initial state when called with undefined state and an unknown action', () => {
    // Вызываем редьюсер с неопределенным состоянием и неизвестным действием
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Ожидаемое состояние
    const expectedState = {
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orders: ordersReducer(undefined, { type: 'UNKNOWN_ACTION' })
    };

    // Проверяем, что состояния совпадают
    expect(initialState).toEqual(expectedState);
  });
});
