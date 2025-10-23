import { IconButton, Popover } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';
import * as React from 'react';
import { useCallback } from 'react';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/hooks/redux.ts';
import { TableFilterType } from '@/components/shared/table/TableView.model.ts';
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

interface ChildProps {
  filter: Record<string, string>;
  anchorEls: Record<string, HTMLElement | null>;
  setAnchorEls: React.Dispatch<React.SetStateAction<Record<string, HTMLElement | null>>>;
  filterKey: string;
  setFilter: ActionCreatorWithPayload<Record<string, string>, string>;
  type: TableFilterType | undefined;
}

const TableFilter: React.FC<ChildProps> = ({ filter, type, setFilter, anchorEls, setAnchorEls, filterKey }) => {
  const dispatch = useAppDispatch();
  const handleOpenFilter = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls((prev) => ({ ...prev, [filterKey]: event.currentTarget }));
  }, [setAnchorEls]);

  const handleCloseFilter = useCallback(() => {
    setAnchorEls((prev) => ({ ...prev, [filterKey]: null }));
  }, [setAnchorEls]);

  const handleFilterChange = useCallback((key: string, value: string) => {
    dispatch(setFilter(({ [key]: value })));
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