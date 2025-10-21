import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { login } from './ActionCreators';
import type { ILogin } from '@/models/ILogin.ts';
import { decodeJwt, type IUserTokenData } from '@/utils/token.ts';
import { JWT_KEY, JWT_KEY_REFRESH } from '@/shared/constants/baseConfig.ts';

interface AuthState {
  user: IUserTokenData | null;
  isLoading: boolean;
  error: string;
}

let userFromToken: IUserTokenData | null = null;

const token = localStorage.getItem(JWT_KEY);
if (token) {
  try {
    userFromToken = decodeJwt(token);
  } catch {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(JWT_KEY_REFRESH);
  }
}

const initialState: AuthState = {
  user: userFromToken,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(JWT_KEY_REFRESH);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ILogin>) => {
        state.isLoading = false;
        state.error = '';
        state.user = decodeJwt(action.payload.accessToken);
        localStorage.setItem(JWT_KEY, action.payload.accessToken);
        localStorage.setItem(JWT_KEY_REFRESH, action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Any error';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
