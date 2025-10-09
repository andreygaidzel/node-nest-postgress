import type { IUser } from '../../models/IUser';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addUser, fetchUsers } from './ActionCreators';

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Any error';
      });

    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.error = '';
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Any error';
      });
  },
});

export default userSlice.reducer;
