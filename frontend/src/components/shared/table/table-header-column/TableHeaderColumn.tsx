import { Box, TableCell, TableSortLabel } from '@mui/material';
import TableFilter from '@/components/shared/table/table-filter/TableFilter.tsx';
import * as React from 'react';
import { useState } from 'react';
import { type ITableColumn } from '@/components/shared/table/TableView.model.ts';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/hooks/redux.ts';
import { type ISortModel, SORT_ORDERS } from '@/models/IFetchTableParams.ts';
import styles from './TableHeaderColumn.module.scss';

interface ChildProps {
  column: ITableColumn;
  sort: ISortModel;
  filter: Record<string, string>;
  setSort: ActionCreatorWithPayload<ISortModel, string>;
  setFilter: ActionCreatorWithPayload<Record<string, string>, string>;
}

const TableHeaderColumn: React.FC<ChildProps> = (
  {
    column: { columnKey, header, align, isSort, isFilter, type },
    sort, filter, setSort, setFilter
  }) => {
  const dispatch = useAppDispatch();
  const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({});
  const { field, order} = sort;

  const handleRequestSort = () => {
    const isAsc = field === columnKey && order === SORT_ORDERS.ASC;
    dispatch(setSort({
      field: columnKey,
      order: isAsc ? SORT_ORDERS.DESC : SORT_ORDERS.ASC
    }));
  };

  return (
    <TableCell align={align} className={styles.tableCell}>
      <Box className={styles.cellContent}>
        {
          isSort ?
          <TableSortLabel
            active={field === columnKey}
            direction={field === columnKey ? order : SORT_ORDERS.ASC}
            onClick={handleRequestSort}
          >
          {header}
        </TableSortLabel> :
          header
        }
        {isFilter && <TableFilter
          filter={filter}
          setFilter={setFilter}
          anchorEls={anchorEls}
          setAnchorEls={setAnchorEls}
          filterKey={columnKey}
          type={type}
        />}
      </Box>
    </TableCell>
  );
}

export default TableHeaderColumn;