import type { ISortModel } from '@/models/IFetchTableParams.ts';

export const mapSortValue = ({ field, order }: ISortModel): string => {
  return `${field}.${order}`;
}