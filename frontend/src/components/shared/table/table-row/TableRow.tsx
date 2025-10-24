import React, { type JSX } from 'react';
import { IconButton, TableCell, TableRow as MatTableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ITableEntity, ITableColumn } from '@/components/shared/table/TableView.model.ts';
import styles from './TableRow.module.scss';
import { formatDate } from '@/utils/date.ts';

interface TableRowProps<T extends ITableEntity> {
  item: T;
  columns: ITableColumn[]
  remove: (item: T) => void;
  update?: (item: T) => void;
}

function TableRow<T extends ITableEntity>({ item, remove, columns }: TableRowProps<T>) {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(item);
  };

  // const handleUpdate = (event: React.MouseEvent) => {
  //   console.log(event);
  //   const title = prompt() || '';
  //   update({ ...post, title });
  // };

  return (
    <MatTableRow className={styles.tableRow}>
      {
        columns.map((column) => (
          <TableCell key={column.columnKey} sx={column.sx}>
            {column.templateFn ?
              column.templateFn(column, item) :
              <>{column.type ==='date' ? formatDate(item[column.columnKey] as string) : (item[column.columnKey] || '')}</>
            }
          </TableCell>
        ))
      }
      <TableCell align="right">
        <IconButton
          color="error"
          onClick={handleRemove}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </MatTableRow>
  );
}

const MemoizedCTableRow = React.memo(TableRow) as <T extends ITableEntity>(
  props: TableRowProps<T>
) => JSX.Element;

export default MemoizedCTableRow;
