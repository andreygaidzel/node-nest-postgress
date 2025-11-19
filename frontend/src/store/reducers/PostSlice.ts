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
      const filterEntry = Object.entries(action.payload);
      filterEntry.forEach(([key, value]) => {
        if (!value || (Array.isArray(value) && value.every(p => !p))) {
          delete state.filter[key];
        } else {
          state.filter[key] = value;
        }
      })

      PostsActions.setPage(DEFAULT_PAGE);
    },
  },
});

export const PostsActions = postsSlice.actions;
export default postsSlice.reducer;