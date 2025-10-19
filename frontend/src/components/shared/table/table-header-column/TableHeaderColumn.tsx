import { Box, TableCell, TableSortLabel } from '@mui/material';
import TableFilter from '@/components/shared/table/table-filter/TableFilter.tsx';
import * as React from 'react';
import { useEffect, useState } from 'react';
import type { ITableColumn } from '@/components/shared/table/TableView.model.ts';

type Order = 'asc' | 'desc';

interface ChildProps {
  column: ITableColumn;
  sort: string;
  filter: Record<string, string>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  handleFilterChange: (filter: Record<string, string>) => void;
}

const TableHeaderColumn: React.FC<ChildProps> = (
  {
    column: { columnKey, header, align, isSort, isFilter },
    sort, filter, setSort, handleFilterChange
  }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>(columnKey);
  const [anchorEls, setAnchorEls] = useState<Record<string, HTMLElement | null>>({});

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setSort(`${property}.${order}`)
  };

  useEffect(() => {
    if (sort) {
      const [property, order] = sort.split('.');
      setOrder(order as Order);
      setOrderBy(property);
    }
  }, [sort]);

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
          filterValues={filter}
          setFilterValues={handleFilterChange}
          anchorEls={anchorEls}
          setAnchorEls={setAnchorEls}
          filterKey={columnKey}
        />}
      </Box>
    </TableCell>
  );
}

export default TableHeaderColumn;