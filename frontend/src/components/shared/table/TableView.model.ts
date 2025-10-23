import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { ISortModel } from '@/models/IFetchTableParams.ts';

export enum TableFilterType {
  DATE = 'date',
  SELECT = 'select',
  TEXT = 'text',
}

export interface ITableView {
  columns: ITableColumn[];
}

export interface ITableColumn {
  columnKey: string;
  header: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  isFilter?: boolean;
  isSort?: boolean;
  type?: TableFilterType;
  templateFn?: (column: ITableColumn, item: any) => React.ReactNode;
  sx?: SxProps<Theme>;
}

export interface TableActions {
  setPage: ActionCreatorWithPayload<number, string>;
  setPageSize: ActionCreatorWithPayload<number, string>;
  setSort: ActionCreatorWithPayload<ISortModel, string>;
  setFilter: ActionCreatorWithPayload<Record<string, string>, string>;
}

export interface TableEntity extends Record<string, string | number | undefined> {
  id: string | number;
}
