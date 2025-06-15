import ingredientsReducer, {
  addIngredient,
  removeIngredient,
  resetConstructor,
  fetchIngredients,
  reorderIngredients
} from './ingredientsSlice';
import { expect } from '@jest/globals';

const mockBun = {
  _id: '1',
  name: 'Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  price: 50,
  image: 'bun-image.jpg',
  image_large: 'bun-image-large.jpg',
  image_mobile: 'bun-image-mobile.jpg',
  uniqueId: 'efd2faaa-7123-4d8d-a3d8-0a4c9d00af80'
};

const mockIngredient = {
  _id: '2',
  name: 'Lettuce',
  type: 'main',
  proteins: 1,
  fat: 0,
  carbohydrates: 2,
  calories: 15,
  price: 10,
  image: 'lettuce-image.jpg',
  image_large: 'lettuce-image-large.jpg',
  image_mobile: 'lettuce-image-mobile.jpg',
  uniqueId: 'ac9931c4-65ca-47fe-b35e-08df69e1bdb4'
};

const mockIngredient2 = {
  _id: '3',
  name: 'Tomato',
  type: 'main',
  proteins: 1,
  fat: 0,
  carbohydrates: 3,
  calories: 20,
  price: 15,
  image: 'tomato-image.jpg',
  image_large: 'tomato-image-large.jpg',
  image_mobile: 'tomato-image-mobile.jpg',
  uniqueId: 'b7f1a518-0c54-4464-a2d8-d5a79385dcc0'
};

const mockIngredients = [mockBun, mockIngredient, mockIngredient2];

describe('ingredientsSlice reducer', () => {
  let initialState = {
    ingredients: [],
    selectedIngredients: [],
    constructor: {
      bun: null,
      ingredients: []
    },
    isLoading: false,
    error: null
  };

  beforeEach(() => {
    initialState = {
      ingredients: [],
      selectedIngredients: [],
      constructor: {
        bun: null,
        ingredients: []
      },
      isLoading: false,
      error: null
    };
  });

  it('should handle adding an ingredient', () => {
    const action = addIngredient(mockIngredient);
    const state = ingredientsReducer(initialState, action);

    expect(state.selectedIngredients.length).toBe(1);
    expect(state.constructor.ingredients.length).toBe(1);
    expect(state.constructor.ingredients[0].name).toBe('Lettuce');
  });

  it('should handle adding a bun', () => {
    const action = addIngredient(mockBun);
    const state = ingredientsReducer(initialState, action);

    expect(state.constructor.bun?.name).toBe('Bun');
  });

  it('should handle removing an ingredient', () => {
    const actionAdd = addIngredient(mockIngredient);
    let state = ingredientsReducer(initialState, actionAdd);

    const uniqueId = state.selectedIngredients[0].uniqueId;
    const actionRemove = removeIngredient(uniqueId!);
    state = ingredientsReducer(state, actionRemove);

    expect(state.selectedIngredients.length).toBe(0);
    expect(state.constructor.ingredients.length).toBe(0);
  });

  it('should handle reordering ingredients', () => {
    const actionAdd1 = addIngredient(mockIngredient);
    const actionAdd2 = addIngredient(mockIngredient2);

    let state = ingredientsReducer(initialState, actionAdd1);
    state = ingredientsReducer(state, actionAdd2);

    const actionReorder = reorderIngredients({ fromIndex: 0, toIndex: 1 });
    state = ingredientsReducer(state, actionReorder);

    expect(state.constructor.ingredients[0].name).toBe('Tomato');
    expect(state.constructor.ingredients[1].name).toBe('Lettuce');
  });

  it('should handle resetting the constructor', () => {
    const actionAddBun = addIngredient(mockBun);
    const actionAddIngredient = addIngredient(mockIngredient);

    let state = ingredientsReducer(initialState, actionAddBun);
    state = ingredientsReducer(state, actionAddIngredient);

    const actionReset = resetConstructor();
    state = ingredientsReducer(state, actionReset);

    expect(state.constructor.bun).toBe(null);
    expect(state.constructor.ingredients.length).toBe(0);
  });

  it('should set isLoading to true when fetchIngredients is pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should set ingredients and isLoading to false when fetchIngredients is fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  it('should set error and isLoading to false when fetchIngredients is rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Error fetching ingredients'
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.error).toBe('Error fetching ingredients');
    expect(state.isLoading).toBe(false);
  });
});
