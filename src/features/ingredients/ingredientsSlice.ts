import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';
import { v4 as uuidv4 } from 'uuid';

interface IngredientsState {
  ingredients: TIngredient[];
  selectedIngredients: TIngredient[];
  constructor: {
    bun?: TIngredient | null;
    ingredients: TIngredient[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  selectedIngredients: [],
  constructor: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

// Селектор для извлечения всех ингредиентов из состояния
const selectIngredients = (state: RootState) =>
  state.rootReducer.ingredients.ingredients;

// Селектор для поиска ингредиента по id
export const selectIngredientById = createSelector(
  [selectIngredients, (_: RootState, id: string) => id], // Передаем состояние и id
  (ingredients, id) => ingredients.find((ingredient) => ingredient._id === id)
);

// Асинхронная Thunk-функция для запроса ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_) => {
    const data = await getIngredientsApi();
    return data; // Возвращаем данные ингредиентов
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<TIngredient & { uniqueId: string }>
      ) => {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          // Добавление/замена булки
          state.constructor.bun = ingredient;
        } else {
          // Добавление ингредиента с уникальным id
          state.constructor.ingredients.push(ingredient);
        }
        state.selectedIngredients.push(ingredient);
      },
      prepare: (ingredient: TIngredient) =>
        // Подготовка payload с добавлением uniqueId
        ({ payload: { ...ingredient, uniqueId: uuidv4() } })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      // Удаление ингредиента из selectedIngredients и constructor.ingredients
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );

      state.constructor.ingredients = state.constructor.ingredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload
      );
    },
    reorderIngredients: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.constructor.ingredients;

      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= ingredients.length ||
        toIndex >= ingredients.length
      ) {
        return; // Защита от выхода за границы массива
      }

      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);
    },
    resetConstructor: (state) => {
      // Сброс конструктора (булка и ингредиенты)
      state.constructor = {
        bun: null,
        ingredients: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true; // Включаем флаг загрузки
        state.error = null; // Сбрасываем ошибку
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload; // Сохраняем ингредиенты
          state.isLoading = false; // Выключаем флаг загрузки
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false; // Выключаем флаг загрузки
        state.error = action.payload as string; // Записываем ошибку
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  reorderIngredients
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
