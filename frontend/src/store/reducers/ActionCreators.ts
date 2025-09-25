import axios from 'axios';
import type { IUser } from '../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk<
  IUser[],
  { limit?: number; page?: number },
  { rejectValue: string }
>('user/fetchAll', async ({ limit = 5, page = 1 }, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users', {
      params: { _limit: limit, _page: page },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
  }
});
