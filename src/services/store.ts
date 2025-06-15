import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Импорт редьюсеров
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import userReducer from '../features/user/userSlice';
import ordersReducer from '../features/feed/feedSlice';

// Объединение редьюсеров
const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer
});

// Создание store с настройками
const store = configureStore({
  reducer: {
    rootReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

// Типы для store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Типизированные хуки для работы со store
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
