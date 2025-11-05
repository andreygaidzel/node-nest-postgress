import axios from 'axios';
import type { IUser } from '@/models/IUser.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '@/shared/constants/baseConfig.ts';
import type { ILoginForm } from '@/models/ILoginForm.ts';
import type { ILogin } from '@/models/ILogin.ts';
import { callBaseQuery } from '@/utils/callBaseQuery.ts';

export const fetchUsers = createAsyncThunk<
  IUser[],
  { limit?: number; page?: number },
  { rejectValue: string }
>('user/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await callBaseQuery({ url: '/users', method: 'GET' });
    return response.data as IUser[];
  } catch (e) {
    return rejectWithValue('Error in load users request');
  }
});

export const addUser = createAsyncThunk<IUser, ILoginForm, { rejectValue: string }>(
  'user/addUser',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post<IUser>(`${baseUrl}/users`, newUser);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Error in create user request');
    }
  }
);

export const login = createAsyncThunk<ILogin, ILoginForm, { rejectValue: string }>(
  'auth/login',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post<ILogin>(`${baseUrl}/auth/login`, newUser);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Error in login request');
    }
  }
);
