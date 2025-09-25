import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPost } from '../models/IPost.ts';

interface FetchPostsArgs {
  limit?: number;
  page?: number;
}

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchPosts: build.query<IPost[], FetchPostsArgs>({
      query: ({ limit = 5, page = 1 }) => ({
        url: `/posts`,
        params: {
          _limit: limit,
          _page: page,
        },
      }),
      providesTags: () => ['Post'],
    }),
    createPost: build.mutation<IPost, IPost>({
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
