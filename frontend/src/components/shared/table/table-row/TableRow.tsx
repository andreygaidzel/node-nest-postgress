import React, { type JSX } from 'react';
import { Box, IconButton, TableCell, TableRow as MatTableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { ITableEntity, ITableColumn } from '@/components/shared/table/TableView.model.ts';
import styles from './TableRow.module.scss';
import { formatDate } from '@/utils/date.ts';

interface TableRowProps<T extends ITableEntity> {
  item: T;
  columns: ITableColumn[]
  remove: (item: T) => void;
  edit: (item: T) => void;
}

function TableRow<T extends ITableEntity>({ item, remove, edit, columns }: TableRowProps<T>) {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(item);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    event.stopPropagation();
    edit(item);
  };

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
        <Box className={styles.actions}>
          <IconButton
            color="warning"
            onClick={handleUpdate}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={handleRemove}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </MatTableRow>
  );
}

const MemoizedCTableRow = React.memo(TableRow) as <T extends ITableEntity>(
  props: TableRowProps<T>
) => JSX.Element;

export default MemoizedCTableRow;
