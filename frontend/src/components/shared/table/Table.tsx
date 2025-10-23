import type { TableEntity, ITableView, TableActions } from '@/components/shared/table/TableView.model.ts';
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
import { useAppDispatch } from '@/hooks/redux.ts';
import type { IFetchTableParams } from '@/models/IFetchTableParams.ts';
import type { IPaginatedList } from '@/models/IPaginatedList.ts';
import { ROWS_PER_PAGE_OPTIONS } from '@/components/shared/table/Table.const.ts';
import { useDebounce } from '@/utils/debounce.ts';
import styles from './Table.module.scss';

type ErrorFetch = {
  isLoading: false;
  error: any;
}

type LoadingFetch = {
  isLoading: true;
}

type SuccessFetch<T> = {
  isLoading: false;
  data: IPaginatedList<T>;
}

interface TableProps<T extends TableEntity> {
  tableModel: ITableView;
  handleRemove: (item: T) => void;
  handleUpdate: (item: T) => void;
  sliceActions: TableActions,
  useFetchQuery: (args: IFetchTableParams) => SuccessFetch<T> | LoadingFetch | ErrorFetch;
  stateSelector: IFetchTableParams;
}

function Table<T extends TableEntity>(
  {
    tableModel,
    handleRemove,
    handleUpdate,
    sliceActions,
    useFetchQuery,
    stateSelector,
  }: TableProps<T>) {
  const dispatch = useAppDispatch();
  const { page, pageSize, sort, filter } = stateSelector;
  const debouncedFilter = useDebounce<Record<string, string>>(filter, 500);
  const fetchResult = useFetchQuery({
    page,
    pageSize,
    sort,
    filter: debouncedFilter,
  });
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

  if (fetchResult.isLoading) {
    return <h1>Loading...</h1>;
  }

  if ('error' in fetchResult) {
    return <h3>Some error {JSON.stringify(fetchResult.error)}</h3>
  }

  const { data, totalItems } = fetchResult.data;
  return (
    <>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <MatTable stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
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
                  update={handleUpdate}
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

export default Table;