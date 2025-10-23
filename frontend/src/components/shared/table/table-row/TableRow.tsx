import React, { type JSX } from 'react';
import { IconButton, TableCell, TableRow as MatTableRow } from '@mui/material';
import { viewDateFormat } from '@/shared/constants/baseConfig.ts';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import type { TableEntity, ITableColumn } from '@/components/shared/table/TableView.model.ts';
import styles from './TableRow.module.scss';

interface TableRowProps<T extends TableEntity> {
  item: T;
  columns: ITableColumn[]
  remove: (item: T) => void;
  update?: (item: T) => void;
}

function TableRow<T extends TableEntity>({ item, remove, columns }: TableRowProps<T>) {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(item);
  };

  const formatDate = (date: string) => date && dayjs(date).format(viewDateFormat);

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

const MemoizedCTableRow = React.memo(TableRow) as <T extends TableEntity>(
  props: TableRowProps<T>
) => JSX.Element;

export default MemoizedCTableRow;
