import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPost } from '../models/IPost.ts';
import type { IRole } from '../models/IRole.ts';
import { baseUrl } from '../shared/constants/baseConfig.ts';

interface FetchRolesArgs {
  limit?: number;
  page?: number;
}

export const roleAPI = createApi({
  reducerPath: 'roleAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Role'],
  endpoints: (build) => ({
    fetchRoles: build.query<IRole[], FetchRolesArgs>({
      query: ({ limit = 5, page = 1 }) => ({
        url: `/roles`,
        params: {
          limit,
          page,
        },
      }),
      providesTags: () => ['Role'],
    }),
    createRole: build.mutation<IRole, IRole>({
      query: (role) => ({
        url: `/roles`,
        method: 'POST',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),
    updateRole: build.mutation<IRole, IRole>({
      query: (role) => ({
        url: `/roles/${role.id}`,
        method: 'PUT',
        body: role,
      }),
      invalidatesTags: ['Role'],
    }),
    deleteRole: build.mutation<IPost, IPost>({
      query: (role) => ({
        url: `/roles/${role.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
  }),
});

export const {
  useFetchRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleAPI;
