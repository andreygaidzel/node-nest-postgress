import type { IFilterParam } from '@/components/shared/table/TableView.model.ts';

export enum SORT_ORDERS {
  ASC = 'asc',
  DESC = 'desc'
}
export type IOrderType = typeof SORT_ORDERS[keyof typeof SORT_ORDERS]

export interface ISortModel {
  field: string;
  order: IOrderType
}

export interface IFetchTableParams {
  pageSize: number;
  page: number;
  sort: ISortModel;
  filter: Record<string, IFilterParam>;
}