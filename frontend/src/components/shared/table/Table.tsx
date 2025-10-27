import type {
  ITableEntity,
  ITableView,
  IFetchResult,
  IPublicTableActions,
} from '@/components/shared/table/TableView.model.ts';
import {
  Paper,
  Table as MatTable,
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
import { ROWS_PER_PAGE_OPTIONS } from '@/components/shared/table/Table.const.ts';
import styles from './Table.module.scss';
import type { IFetchTableParams } from '@/models/IFetchTableParams.ts';

interface TableProps<T extends ITableEntity> {
  tableModel: ITableView;
  removeAction: (item: T) => void;
  editAction: (item: T) => void;
  actions: IPublicTableActions,
  fetchResult: IFetchResult<T>;
  state: IFetchTableParams;
}

function Table<T extends ITableEntity>(
  {
    tableModel,
    removeAction: handleRemove,
    editAction: handleEdit,
    actions: { setPage, setFilter, setSort, setPageSize },
    fetchResult,
    state: { page, pageSize, sort, filter }
  }: TableProps<T>) {
  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    setPage(page + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
  };

  if (fetchResult.isLoading) {
    return <h1>Loading...</h1>;
  }

  if ('error' in fetchResult) {
    return <h3>Some error {JSON.stringify(fetchResult.error)}</h3>
  }

  if ('data' in fetchResult) {
    const { data, totalItems } = fetchResult.data;
    return (
      <>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <MatTable stickyHeader className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableModel.columns.map((column) => (
                  <TableHeaderColumn
                    key={column.columnKey}
                    column={column}
                    sort={sort}
                    filter={filter}
                    setSort={setSort}
                    setFilter={setFilter}
                  />
                ))}
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item: T) => (
                <MemoizedCTableRow
                  key={item.id}
                  remove={handleRemove}
                  edit={handleEdit}
                  item={item}
                  columns={tableModel.columns}/>
              ))}
            </TableBody>
          </MatTable>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalItems || 0}
          page={page - 1}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageChange={handlePageChange}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  }
}

export default Table;