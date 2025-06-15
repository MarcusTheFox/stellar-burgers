import userReducer, {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';
import { expect } from '@jest/globals';

describe('User Reducer - getUser', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null
  };

  it('should handle getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getUser.fulfilled', () => {
    const userPayload = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com'
    };
    const action = { type: getUser.fulfilled.type, payload: userPayload };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(userPayload); // Проверяем, что пользователь записался в state
    expect(state.isUserDataOnInitLoaded).toBe(true); // Проверяем, что флаг инициализации обновился
  });

  it('should handle getUser.rejected', () => {
    const errorMessage = 'Failed to fetch user';
    const action = { type: getUser.rejected.type, payload: errorMessage };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage); // Проверяем, что ошибка записалась
    expect(state.isUserDataOnInitLoaded).toBe(true); // Проверяем, что флаг инициализации обновился
  });
});

describe('userSlice reducers', () => {
  // Начальное состояние
  const initialState = {
    user: null,
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null
  };

  it('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isLoading: false
    });
  });

  it('should handle loginUser.rejected', () => {
    const mockError = 'Invalid credentials';
    const action = { type: loginUser.rejected.type, payload: mockError };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: mockError
    });
  });
});

describe('User Reducer - logoutUser', () => {
  const initialState = {
    user: { id: '123', name: 'Test User', email: 'test@example.com' }, // Пример начального состояния с пользователем
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null
  };

  it('should handle logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(null); // Пользователь должен быть сброшен
  });

  it('should handle logoutUser.rejected', () => {
    const errorMessage = 'Failed to logout';
    const action = { type: logoutUser.rejected.type, payload: errorMessage };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

describe('User Reducer - registerUser', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null
  };

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle registerUser.fulfilled', () => {
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com'
    }; // Example user data
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });

  it('should handle registerUser.rejected', () => {
    const errorMessage = 'Failed to register user';
    const action = { type: registerUser.rejected.type, payload: errorMessage };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

describe('User Reducer - updateUser', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isUserDataOnInitLoaded: false,
    error: null
  };

  it('should handle updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle updateUser.fulfilled', () => {
    const mockUpdatedUser = {
      id: '123',
      name: 'Updated User',
      email: 'updated@example.com'
    }; // Пример обновленных данных пользователя
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUpdatedUser
    };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUpdatedUser);
  });

  it('should handle updateUser.rejected', () => {
    const errorMessage = 'Failed to update user';
    const action = { type: updateUser.rejected.type, payload: errorMessage };
    const state = userReducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
