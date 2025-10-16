import { createApi } from '@reduxjs/toolkit/query/react';
import type { IPost } from '../models/IPost.ts';
import { baseQueryWithReauth } from '@/baseQuery.ts';
import type { IPaginatedList } from '@/models/IPaginatedList.ts';

interface FetchPostsArgs {
  limit?: number;
  page?: number;
}

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchPosts: build.query<IPaginatedList<IPost>, FetchPostsArgs>({
      query: ({ limit = 5, page = 1 }) => ({
        url: `/posts`,
        params: {
          pageSize: limit,
          page: page,
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
