import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { JWT_KEY, JWT_KEY_REFRESH } from '@/services/AuthService/AuthService.const.ts';
import { baseUrl } from '@/shared/constants/baseConfig.ts';
import type { ILogin } from '@/models/ILogin.ts';

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
      const refreshToken = localStorage.getItem(JWT_KEY_REFRESH);
      if (!refreshToken) {
        api.dispatch({ type: 'auth/logout' });
        return result;
      }

      const refreshResult = await rawBaseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api, extraOptions);

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken } = refreshResult.data as ILogin;
        localStorage.setItem(JWT_KEY, accessToken);
        localStorage.setItem(JWT_KEY_REFRESH, newRefreshToken);

        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch({ type: 'auth/logout' });
      }
    }

    return result;
  };
