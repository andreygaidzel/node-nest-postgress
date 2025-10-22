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
import { useAppDispatch } from '@/hooks/redux.ts';
import type { IFetchTableParams, ISortModel } from '@/models/IFetchTableParams.ts';
import type { IPaginatedList } from '@/models/IPaginatedList.ts';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ROWS_PER_PAGE_OPTIONS } from '@/components/shared/table/Table.const.ts';
import { useDebounce } from '@/utils/debounce.ts';

interface TableActions {
  setPage: ActionCreatorWithPayload<number, string>;
  setPageSize: ActionCreatorWithPayload<number, string>;
  setSort: ActionCreatorWithPayload<ISortModel, string>;
  setFilter: ActionCreatorWithPayload<Record<string, string>, string>;
}

interface ChildProps<T extends { id: string | number }> {
  tableModel: ITableView;
  handleRemove: (item: T) => void;
  handleUpdate: (item: T) => void;
  sliceActions: TableActions,
  useFetchQuery: (args: IFetchTableParams) => { data?: IPaginatedList<T>; isLoading: boolean; error?: any };
  stateSelector: IFetchTableParams;
}

function CTable<T extends { id: string | number }>(
  {
    tableModel,
    handleRemove,
    handleUpdate,
    sliceActions,
    useFetchQuery,
    stateSelector,
  }: ChildProps<T>) {
  const dispatch = useAppDispatch();
  const { page, pageSize, sort, filter } = stateSelector;
  const debouncedFilter = useDebounce<Record<string, string>>(filter, 500);
  const { data, isLoading, error } = useFetchQuery({
    page,
    pageSize,
    sort,
    filter: debouncedFilter,
  });
  const { data: rows, totalItems } = data || {};
  const { setSort, setPage, setPageSize, setFilter } = sliceActions;

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    dispatch(setPage(page + 1));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    dispatch(setPageSize(newPageSize));
  };

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {error && <h3>Some error {JSON.stringify(error)}</h3>}
      {rows &&
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 220px)', mb: 2 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
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
              {rows.map((item: T) => (
                <MemoizedCTableRow
                  key={item.id}
                  remove={handleRemove}
                  update={handleUpdate}
                  item={item}
                  columns={tableModel.columns}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
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

export default CTable;