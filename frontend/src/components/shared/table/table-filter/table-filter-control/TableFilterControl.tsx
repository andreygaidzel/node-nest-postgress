import { type IFilterParam, TableFilterType } from '@/components/shared/table/TableView.model.ts';
import { Box, IconButton, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import type { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import Close from '@mui/icons-material/Close';

interface TableFilterControlProps {
  type: TableFilterType | undefined;
  filterKey: string;
  filter: Record<string, IFilterParam>;
  onFilterChange: (key: string, value: IFilterParam) => void;
}

const TableFilterControl = ({ type, filterKey, filter, onFilterChange: handleFilterChange }: TableFilterControlProps) => {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);

    if (endDate && date && date.isAfter(endDate)) {
      setEndDate(null);
    }
  };

  const handleDateClear = () => {
    setEndDate(null);
    setStartDate(null);
  }

  useEffect(() => {
    console.log(startDate, endDate);
    handleFilterChange(filterKey, [startDate?.toISOString() || null, endDate?.toISOString() || null])
  }, [startDate, endDate])

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
              label="Date From"
              value={startDate}
              onChange={handleStartDateChange}
            />

            <DatePicker
              label="Date To"
              value={endDate}
              minDate={startDate || undefined}
              onChange={setEndDate}
            />
            <IconButton
              color="error"
              onClick={handleDateClear}
              aria-label="delete"
            >
              <Close />
            </IconButton>
          </Box>
        </LocalizationProvider>
      );
    default:
      return null;
  }
}

export default TableFilterControl;