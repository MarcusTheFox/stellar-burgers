import {
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';

export interface UserState {
  user: TUser | null;
  isLoading: boolean;
  isUserDataOnInitLoaded: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  isUserDataOnInitLoaded: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: { email: string; password: string }) => {
    const response = await loginUserApi(userData);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: { name: string; email: string; password: string }) => {
    const response = await registerUserApi(userData);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: { name: string; email: string; password: string }) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await logoutApi();
  return response;
});

export const getUser = createAsyncThunk('user/getUser', async (_) => {
  const response = await getUserApi();
  return response.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        if (!state.isUserDataOnInitLoaded) {
          state.isUserDataOnInitLoaded = true;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        if (!state.isUserDataOnInitLoaded) {
          state.isUserDataOnInitLoaded = true;
        }
      });
  }
});

export default userSlice.reducer;
