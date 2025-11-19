import { IconButton, Popover } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';
import * as React from 'react';
import { useCallback } from 'react';
import {
  type IFilter,
  type IFilterFn,
  type IFilterParam,
  TableFilterType
} from '@/components/shared/table/TableView.model.ts';
import TableFilterControl from '@/components/shared/table/table-filter/table-filter-control/TableFilterControl.tsx';
import type { PopoverOrigin } from '@mui/material/Popover';

const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'center',
}

const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'center',
}

interface TableFilterProps {
  filter: IFilter;
  anchorEls: Record<string, HTMLElement | null>;
  setAnchorEls: React.Dispatch<React.SetStateAction<Record<string, HTMLElement | null>>>;
  filterKey: string;
  setFilter: IFilterFn;
  type: TableFilterType | undefined;
}

const TableFilter: React.FC<TableFilterProps> = ({ filter, type, setFilter, anchorEls, setAnchorEls, filterKey }) => {
  const handleOpenFilter = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls((prev) => ({ ...prev, [filterKey]: event.currentTarget }));
  }, [setAnchorEls]);

  const handleCloseFilter = useCallback(() => {
    setAnchorEls((prev) => ({ ...prev, [filterKey]: null }));
  }, [setAnchorEls]);

  const handleFilterChange = useCallback((key: string, value: IFilterParam) => {
    setFilter(({ [key]: value }));
  }, [setFilter]);

  return (
    <>
      <IconButton
        size='small'
        onClick={handleOpenFilter}>
        <FilterList sx={filter[filterKey] ? { fill: 'red' } : {}} fontSize="small"/>
      </IconButton>
      <Popover
        open={Boolean(anchorEls[filterKey])}
        anchorEl={anchorEls[filterKey]}
        onClose={handleCloseFilter}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <TableFilterControl
          type={type}
          filterKey={filterKey}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
      </Popover>
    </>
  );
};

export default TableFilter;