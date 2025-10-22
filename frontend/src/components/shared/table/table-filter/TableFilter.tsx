import { Box, IconButton, Popover, TextField } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';
import * as React from 'react';
import { useCallback } from 'react';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/hooks/redux.ts';
import { TableFilterType } from '@/components/shared/table/TableView.model.ts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  // обработчик изменения начала диапазона
  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);

    // если начальная дата > конечной — сбрасываем конечную
    if (endDate && date && date.isAfter(endDate)) {
      setEndDate(null);
    }
  };

  const renderFilter = (type: TableFilterType | undefined) => {
    switch (type) {
      case TableFilterType.TEXT:
        return (
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
        );
      case TableFilterType.DATE:
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', gap: 2, padding: 1 }}>
              <DatePicker
                label="Дата от"
                value={startDate}
                onChange={handleStartDateChange}
              />

              <DatePicker
                label="Дата до"
                value={endDate}
                minDate={startDate || undefined}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </Box>
          </LocalizationProvider>
        );
      default:
        return null;
    }
  }

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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {renderFilter(type)}
      </Popover>
    </>
  );
};

export default TableFilter;