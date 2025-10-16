import { baseQueryWithReauth } from '@/baseQuery';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { store } from '@/main.tsx';

export const callBaseQuery = async (args: any) => {
  const api: Pick<BaseQueryApi, 'getState' | 'dispatch'> = {
    getState: store.getState,
    dispatch: store.dispatch,
  };
  const result = await baseQueryWithReauth(args, api as BaseQueryApi, {});
  return result;
};