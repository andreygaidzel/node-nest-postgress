import type { ITableView } from '@/components/shared/table/TableView.model.ts';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import TableHeaderColumn from '@/components/shared/table/table-header-column/TableHeaderColumn.tsx';
import * as React from 'react';
import MemoizedCTableRow from '@/components/shared/table/table-row/TableRow.tsx';

const rowsPerPageOptions = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  }
];

interface ChildProps<T extends { id: string | number }> {
  tableModel: ITableView;
  error: string | undefined;
  isLoading: boolean;
  rows: T[] | undefined;
  totalItems: number | undefined;
  pageSize: number | undefined;
  page: number;
  limit: number;
  handleRemove: (item: T) => void;
  handleUpdate: (item: T) => void;
  setLimit: (page: number) => void;
  setPage: (page: number) => void;
}

function CTable<T extends { id: string | number }>({ tableModel, error, isLoading, rows, page, limit, handleRemove, handleUpdate, totalItems, pageSize, setLimit, setPage }: ChildProps<T>) {
  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    setPage(page + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setLimit(newPageSize);
    setPage(1);
  };

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Some error {error}</h1>}
      {rows &&
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 220px)', mb: 2 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableModel.columns.map((column) => (
                  <TableHeaderColumn column={column} key={column.columnKey}/>
                ))}
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item: T) => (
                <MemoizedCTableRow remove={handleRemove} update={handleUpdate} key={item.id} item={item} columns={tableModel.columns}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <TablePagination
        component="div"
        count={totalItems || 0}
        page={page - 1}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize || limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default CTable;