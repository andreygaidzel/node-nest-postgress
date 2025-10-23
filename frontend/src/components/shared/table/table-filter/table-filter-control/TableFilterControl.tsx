import { TableFilterType } from '@/components/shared/table/TableView.model.ts';
import { Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import type { Dayjs } from 'dayjs';

interface TableFilterControlProps {
  type: TableFilterType | undefined;
  filterKey: string;
  filter: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
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
              onChange={(newValue) => setEndDate(newValue)}
            />
          </Box>
        </LocalizationProvider>
      );
    default:
      return null;
  }
}

export default TableFilterControl;