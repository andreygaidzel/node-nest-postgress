import axios from 'axios';
import type { IUser } from '../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/constants/baseConfig.ts';
import type { ILoginForm } from '../../models/ILoginForm.ts';

export const fetchUsers = createAsyncThunk<
  IUser[],
  { limit?: number; page?: number },
  { rejectValue: string }
>('user/fetchAll', async ({ limit = 5, page = 1 }, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>(`${baseUrl}/users`, {
      params: { _limit: limit, _page: page },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
  }
});

export const addUser = createAsyncThunk<IUser, ILoginForm, { rejectValue: string }>(
  'user/addUser',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post<IUser>(`${baseUrl}/users`, newUser);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать пользователя');
    }
  }
);
