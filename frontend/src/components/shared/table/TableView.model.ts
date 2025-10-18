import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';

export interface ITableView {
  columns: ITableColumn[];
}

export interface ITableColumn {
  columnKey: string;
  header: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  isFilter?: boolean;
  isSort?: boolean;
  type?: 'date' | 'select' | 'text';
  templateFn?: (column: ITableColumn, item: any) => React.ReactNode;
  sx?: SxProps<Theme>;
}
