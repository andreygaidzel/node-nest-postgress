import { IconButton, Popover, TextField } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';
import * as React from 'react';

interface ChildProps {
  filterValues: Record<string, string>;
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  anchorEls: Record<string, HTMLElement | null>;
  setAnchorEls: React.Dispatch<React.SetStateAction<Record<string, HTMLElement | null>>>;
  filterKey: string;
}

const TableFilter: React.FC<ChildProps> = ({ filterValues, setFilterValues, anchorEls, setAnchorEls, filterKey}) => {

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>, key: string) => {
    setAnchorEls((prev) => ({ ...prev, [key]: event.currentTarget }));
  };

  const handleCloseFilter = (key: string) => {
    setAnchorEls((prev) => ({ ...prev, [key]: null }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <IconButton size='small' onClick={(e) => handleOpenFilter(e, filterKey)}>
        <FilterList fontSize="small" />
      </IconButton>
      <Popover
        open={Boolean(anchorEls[filterKey])}
        anchorEl={anchorEls[filterKey]}
        onClose={() => handleCloseFilter(filterKey)}
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
            value={filterValues[filterKey] || ''}
            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
          />
        </div>
      </Popover>
    </>
  );
};

export default TableFilter;