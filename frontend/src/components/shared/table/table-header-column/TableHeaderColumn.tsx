import { Box, TableCell, TableSortLabel } from '@mui/material';
import TableFilter from '@/components/shared/table/table-filter/TableFilter.tsx';
import * as React from 'react';
import { useState } from 'react';
import type { ITableColumn } from '@/components/shared/table/TableView.model.ts';

type Order = 'asc' | 'desc';

interface ChildProps {
  column: ITableColumn;
}

const TableHeaderColumn: React.FC<ChildProps> = ({ column: { columnKey, header, align, isSort, isFilter }}) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>(columnKey);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({});

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableCell align={align}>
      <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        {isSort ? <TableSortLabel
          active={orderBy === columnKey}
          direction={orderBy === columnKey ? order : 'asc'}
          onClick={() => handleRequestSort(columnKey)}
        >
          {header}
        </TableSortLabel> : <>{header}</>}
        {isFilter && <TableFilter
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          anchorEls={anchorEls}
          setAnchorEls={setAnchorEls}
          filterKey={columnKey}
        />}
      </Box>
    </TableCell>
  );
}

export default TableHeaderColumn;