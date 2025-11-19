import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export type IErrorData = {
  error: string;
  message: string;
  statusCode: number;
};

export function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError & { data: IErrorData } {
  return "status" in error && typeof error.data === "object" && error.data !== null;
}