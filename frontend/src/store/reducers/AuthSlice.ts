import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { login } from './ActionCreators';
import type { ILogin } from '@/models/ILogin.ts';
import { decodeJwt, type IUserTokenData } from '@/utils/token.ts';
import { JWT_KEY } from '@/services/AuthService/AuthService.const.ts';

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
        state.user = decodeJwt(action.payload.token);
        localStorage.setItem(JWT_KEY, action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Any error';
      });
  },
});

export default authSlice.reducer;
