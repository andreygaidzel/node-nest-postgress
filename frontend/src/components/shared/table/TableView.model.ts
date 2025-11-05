import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { IFetchTableParams, ISortModel } from '@/models/IFetchTableParams.ts';
import type { IPaginatedList } from '@/models/IPaginatedList.ts';
import React from 'react';

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

export interface ITableActions {
  setPage: ActionCreatorWithPayload<number, string>;
  setPageSize: ActionCreatorWithPayload<number, string>;
  setSort: ActionCreatorWithPayload<ISortModel, string>;
  setFilter: ActionCreatorWithPayload<IFilter, string>;
}

export type ISortFn = (sort: ISortModel) => void;
export type IFilterFn = (filter: IFilter) => void;

export type IFilterParam = string | null | (string | null)[];
export type IFilter = Record<string, IFilterParam>;

export interface IPublicTableActions {
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: ISortFn;
  setFilter: IFilterFn;
}

export interface ITableEntity extends Record<string, string | number | undefined> {
  id: string | number;
}

type IErrorFetch = {
  isLoading: false;
  error?: any;
}

type ILoadingFetch = {
  isLoading: true;
}

type ISuccessFetch<T> = {
  isLoading: false;
  data: IPaginatedList<T>;
}

export type IFetchResult<T> = ISuccessFetch<T> | ILoadingFetch | IErrorFetch;

export type IFetchTableDataFn<T> = (args: IFetchTableParams) => IFetchResult<T>;
