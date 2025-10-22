import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';

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
