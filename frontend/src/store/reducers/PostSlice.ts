import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IFetchTableParams, type ISortModel, SORT_ORDERS } from '@/models/IFetchTableParams.ts';
import { DEFAULT_PAGE } from '@/shared/constants/baseConfig.ts';
import type { IFilter } from '@/components/shared/table/TableView.model.ts';

const initialState: IFetchTableParams = {
  page: DEFAULT_PAGE,
  pageSize: 10,
  sort: {
    field: 'createdAt',
    order: SORT_ORDERS.DESC
  },
  filter: {},
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      PostsActions.setPage(DEFAULT_PAGE);
    },
    setSort: (state, action: PayloadAction<ISortModel>) => {
      state.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<IFilter>) => {
      state.filter = { ...state.filter, ...action.payload };
      PostsActions.setPage(DEFAULT_PAGE);
    },
  },
});

export const PostsActions = postsSlice.actions;
export default postsSlice.reducer;