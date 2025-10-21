import { IconButton, Popover, TextField } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';
import * as React from 'react';
import { useCallback } from 'react';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/hooks/redux.ts';

interface ChildProps {
  filter: Record<string, string>;
  anchorEls: Record<string, HTMLElement | null>;
  setAnchorEls: React.Dispatch<React.SetStateAction<Record<string, HTMLElement | null>>>;
  filterKey: string;
  setFilter: ActionCreatorWithPayload<Record<string, string>, string>;
}

const TableFilter: React.FC<ChildProps> = ({ filter, setFilter, anchorEls, setAnchorEls, filterKey}) => {
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
        <FilterList sx={filter[filterKey] ? { fill: 'red' } : {}} fontSize="small" />
      </IconButton>
      <Popover
        open={Boolean(anchorEls[filterKey])}
        anchorEl={anchorEls[filterKey]}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: 8, width: 200 }}>
          <TextField
            fullWidth
            label={`Filter by ${filterKey}`}
            variant="outlined"
            size="small"
            value={filter[filterKey]}
            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
          />
        </div>
      </Popover>
    </>
  );
};

export default TableFilter;