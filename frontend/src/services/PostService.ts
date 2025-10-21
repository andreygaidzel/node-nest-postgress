import { createApi } from '@reduxjs/toolkit/query/react';
import type { IPost } from '../models/IPost.ts';
import { baseQueryWithReauth } from '@/baseQuery.ts';
import type { IPaginatedList } from '@/models/IPaginatedList.ts';
import { mapFilters } from '@/utils/filters.ts';
import type { IFetchTableParams } from '@/models/IFetchTableParams.ts';
import { mapSortValue } from '@/utils/sort.ts';

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchPosts: build.query<IPaginatedList<IPost>, IFetchTableParams>({
      query: ({ pageSize = 5, page = 1, sort, filter }) => ({
        url: `/posts`,
        params: {
          pageSize,
          page,
          sort: mapSortValue(sort),
          filter: mapFilters(filter)
        },
      }),
      providesTags: () => ['Post'],
    }),
    createPost: build.mutation<IPost, FormData>({
      query: (post) => ({
        url: `/posts`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postAPI;
