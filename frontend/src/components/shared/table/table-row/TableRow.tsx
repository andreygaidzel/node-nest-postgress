import React, { type JSX } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { viewDateFormat } from '@/shared/constants/baseConfig.ts';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ITableColumn } from '@/components/shared/table/TableView.model.ts';

interface ChildProps<T extends Record<string, string | number | undefined>> {
  item: T;
  columns: ITableColumn[]
  remove: (item: T) => void;
  update?: (item: T) => void;
}

function CTableRow<T extends Record<string, string | number | undefined>>({ item, remove, columns }: ChildProps<T>) {
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
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
    </TableRow>
  );
}

const MemoizedCTableRow = React.memo(CTableRow) as <T extends Record<string, string | number | undefined>>(
  props: ChildProps<T>
) => JSX.Element;

export default MemoizedCTableRow;
