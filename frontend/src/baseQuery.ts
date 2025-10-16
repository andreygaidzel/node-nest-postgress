import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { JWT_KEY } from '@/services/AuthService/AuthService.const.ts';
import { baseUrl } from '@/shared/constants/baseConfig.ts';

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, _) => {
    const token = localStorage.getItem(JWT_KEY);
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResult = await rawBaseQuery('/auth/refresh', api, extraOptions);

      if (refreshResult.data) {
        const newToken = (refreshResult.data as { token: string }).token;
        localStorage.setItem(JWT_KEY, newToken);
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch({ type: 'auth/logout' });
      }
    }

    return result;
  };
